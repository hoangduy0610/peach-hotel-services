import { ApplicationException } from '@/controllers/ExceptionController';
import { Booking_Dto } from '@/dtos/Booking_Dto';
import { Booking } from '@/entities/Booking.entity';
import { Coupon } from '@/entities/Promote.entity';
import { Room } from '@/entities/Room.entity';
import { Service } from '@/entities/Service.entity';
import { User } from '@/entities/User.entity';
import { StringUtils } from '@/utils/StringUtils';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
        @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>,
    ) {
    }

    async getBookings(): Promise<Booking[]> {
        return await this.bookingRepository.find({
            relations: ['rooms', 'services', 'coupon', 'rooms.roomTier'],
        });
    }

    async createBooking(booking: Booking_Dto): Promise<Booking> {
        const user = await this.userRepository.findOne({
            where: { id: booking.userId },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        const rooms = await this.roomRepository.find({
            where: { id: In(booking.roomIds) },
        });

        if (!rooms || rooms.length !== booking.roomIds.length) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room not found');
        }

        // Check if room is available (each room has a booking)
        const isAvailable = await this.bookingRepository.findOne({
            where: [
                {
                    rooms: {
                        id: In(booking.roomIds),
                    },
                    checkIn: And(MoreThanOrEqual(booking.checkIn), LessThanOrEqual(booking.checkOut)),
                },
                {
                    rooms: {
                        id: In(booking.roomIds),
                    },
                    checkOut: And(MoreThanOrEqual(booking.checkIn), LessThanOrEqual(booking.checkOut)),
                },
                {
                    rooms: {
                        id: In(booking.roomIds),
                    },
                    checkIn: LessThanOrEqual(booking.checkIn),
                    checkOut: MoreThanOrEqual(booking.checkOut),
                },
            ]
        });

        if (isAvailable) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room is not available');
        }

        // const services = await this.serviceRepository.find({
        //     where: { id: In(booking.serviceIds) },
        // });

        // if (!services) {
        //     throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service not found');
        // }

        // for (const service of services) {
        //     const isAvailable = await this.bookingRepository.findOne({
        //         where: [
        //             {
        //                 services: service,
        //                 checkIn: MoreThan(booking.checkIn),
        //             },
        //             {
        //                 services: service,
        //                 checkOut: LessThan(booking.checkIn),
        //             }
        //         ]
        //     });

        //     if (isAvailable) {
        //         throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service is not available');
        //     }
        // }

        const reservationCode = await StringUtils.randomGeneratePassword(8);

        let total = 0;
        for (const room of rooms) {
            total += room.price;
        }

        // for (const service of services) {
        //     total += service.price;
        // }

        const data = {
            customerName: booking.customerName,
            customerPhone: booking.customerPhone,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            reservationCode: reservationCode,
            total,
            status: 'PENDING',
            coupon: null,
            user,
            rooms,
            // services
        }
        return await this.bookingRepository.save(data);
    }

    async updateBooking(id: number, booking: Pick<Booking_Dto, 'customerName' | 'customerPhone'>): Promise<Booking> {
        const oldBooking = await this.bookingRepository.findOne({
            where: { id: id },
        });

        if (!oldBooking) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking not found');
        }

        const dataUpdate = {
            customerName: booking.customerName,
            customerPhone: booking.customerPhone,
        }

        const newBooking = {
            ...oldBooking,
            ...dataUpdate,
        };

        return await this.bookingRepository.save(newBooking);
    }

    async deleteBooking(id: number): Promise<void> {
        const booking = await this.bookingRepository.findOne({
            where: { id: id },
            relations: ['coupon', 'user'],
        });

        if (!booking) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking not found');
        }

        if (booking.status === 'PENDING') {
            await this.refundPromote(booking);
        }

        await this.bookingRepository.delete({
            id: id,
        });
    }

    async getBookingById(id: number): Promise<Booking> {
        return await this.bookingRepository.findOne({
            where: { id: id },
            relations: ['bookingTier'],
        });
    }

    async applyCoupon(id: number, couponCode: string): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({
            where: { id: id },
            relations: ['coupon'],
        });

        if (!booking) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking not found');
        }

        if (booking.coupon) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking already has a coupon');
        }

        const coupon = await this.couponRepository.findOne({
            where: { code: couponCode },
        });

        if (!coupon) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Coupon not found');
        }

        if (coupon.status !== 'ACTIVE') {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Coupon is not active');
        }

        coupon.status = 'USED';

        const newBooking = {
            ...booking,
            coupon,
            total: booking.total - (coupon.promote.type === 'PERCENT' ? (booking.total * coupon.promote.discount / 100) : coupon.promote.discount),
        };

        await this.couponRepository.save(coupon);
        return await this.bookingRepository.save(newBooking);
    }

    async applyPeachCoin(userId: number, id: number): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({
            where: { id: id }
        });

        if (!booking) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking not found');
        }

        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        const reduceAmount = user.peachCoin >= booking.total ? booking.total : user.peachCoin;

        user.peachCoin -= reduceAmount;

        const newBooking: Booking = {
            ...booking,
            total: booking.total - reduceAmount,
            peachCoinApplied: booking.peachCoinApplied + reduceAmount,
        };

        await this.userRepository.save(user);
        return await this.bookingRepository.save(newBooking);
    }

    async cancelBooking(id: number): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({
            where: { id: id },
            relations: ['coupon', 'user'],
        });

        if (!booking) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking not found');
        }

        if (booking.status !== 'PENDING') {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking cannot be cancelled due to status');
        }

        await this.refundPromote(booking);

        const newBooking = {
            ...booking,
            status: 'CANCELLED',
        };

        return await this.bookingRepository.save(newBooking);
    }

    private async refundPromote(booking: Booking): Promise<void> {
        if (booking.coupon) {
            const coupon = await this.couponRepository.findOne({
                where: { id: booking.coupon.id },
            });

            coupon.status = 'ACTIVE';

            await this.couponRepository.save(coupon);
        }

        if (booking.peachCoinApplied > 0) {
            const user = await this.userRepository.findOne({
                where: { id: booking.user.id },
            });

            user.peachCoin += booking.peachCoinApplied;
            await this.userRepository.save(user);
        }
    }
}