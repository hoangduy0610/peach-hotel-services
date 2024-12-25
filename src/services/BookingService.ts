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
import { In, LessThan, MoreThan, Repository } from 'typeorm';

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
        return await this.bookingRepository.find();
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

        if (!rooms) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room not found');
        }

        // Check if room is available (each room has a booking)
        for (const room of rooms) {
            const isAvailable = await this.bookingRepository.findOne({
                where: [
                    {
                        rooms: room,
                        checkIn: MoreThan(booking.checkIn),
                    },
                    {
                        rooms: room,
                        checkOut: LessThan(booking.checkIn),
                    }
                ]
            });

            if (isAvailable) {
                throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room is not available');
            }
        }

        const services = await this.serviceRepository.find({
            where: { id: In(booking.serviceIds) },
        });

        if (!services) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service not found');
        }

        for (const service of services) {
            const isAvailable = await this.bookingRepository.findOne({
                where: [
                    {
                        services: service,
                        checkIn: MoreThan(booking.checkIn),
                    },
                    {
                        services: service,
                        checkOut: LessThan(booking.checkIn),
                    }
                ]
            });

            if (isAvailable) {
                throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service is not available');
            }
        }

        const reservationCode = StringUtils.randomGeneratePassword(8);

        let total = 0;
        for (const room of rooms) {
            total += room.price;
        }

        for (const service of services) {
            total += service.price;
        }

        const data = {
            customerName: booking.customerName,
            customerPhone: booking.customerPhone,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            reservationCode,
            total,
            status: 'PENDING',
            coupon: null,
            user,
            rooms,
            services
        }
        return await this.bookingRepository.save(booking);
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
        await this.bookingRepository.delete(id);
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

        const newBooking = {
            ...booking,
            coupon,
            total: booking.total - (coupon.promote.type === 'PERCENT' ? (booking.total * coupon.promote.discount / 100) : coupon.promote.discount),
        };

        return await this.bookingRepository.save(newBooking);
    }
}