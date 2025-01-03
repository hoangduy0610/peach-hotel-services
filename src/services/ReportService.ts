import { Booking } from "@/entities/Booking.entity";
import { PaymentHistory } from "@/entities/PaymentHistory.entity";
import { Coupon } from "@/entities/Promote.entity";
import { Room } from "@/entities/Room.entity";
import { Service } from "@/entities/Service.entity";
import { User } from "@/entities/User.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { Repository } from "typeorm";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
        @InjectRepository(PaymentHistory) private readonly paymentHistoryRepository: Repository<PaymentHistory>,
    ) {
    }

    async getSystemReport() {
        const totalRoom = await this.roomRepository.count();
        const totalUser = await this.userRepository.count();
        const totalService = await this.serviceRepository.count();
        const totalBooking = await this.bookingRepository.count();

        // Finance
        const totalPayment = await this.paymentHistoryRepository.createQueryBuilder('payment')
            .select('SUM(payment.amount)')
            .getRawOne();
        const totalConfirmedPaymentValue = await this.paymentHistoryRepository.createQueryBuilder('payment')
            .select('SUM(payment.amount)')
            .where('payment.status = :status', { status: 'CONFIRMED' })
            .getRawOne();
        const totalBookingValue = await this.bookingRepository.createQueryBuilder('booking')
            .select('SUM(booking.total)')
            .where('booking.status <> :status', { status: 'CANCELLED' })
            .getRawOne();

        // Booking data
        const last14DaysBookingAmountEachDay = await this.bookingRepository.createQueryBuilder('booking')
            .select('DATE(booking.createdAt) as date, COUNT(booking.id) as amount')
            .where('booking.createdAt >= :date', { date: moment().startOf('day').subtract(14, 'days').toDate() })
            .where('booking.status <> :status', { status: 'CANCELLED' })
            .groupBy('DATE(booking.createdAt)')
            .orderBy('DATE(booking.createdAt)')
            .getRawMany();

        const last14DaysBookingValueEachDay = await this.bookingRepository.createQueryBuilder('booking')
            .select('DATE(booking.createdAt) as date, SUM(booking.total) as amount')
            .where('booking.createdAt >= :date', { date: moment().startOf('day').subtract(14, 'days').toDate() })
            .where('booking.status <> :status', { status: 'CANCELLED' })
            .groupBy('DATE(booking.createdAt)')
            .orderBy('DATE(booking.createdAt)')
            .getRawMany();

        const last30DaysBookingValueEachDay = await this.bookingRepository.createQueryBuilder('booking')
            .select('DATE(booking.createdAt) as date, SUM(booking.total) as amount')
            .where('booking.createdAt >= :date', { date: moment().startOf('day').subtract(30, 'days').toDate() })
            .where('booking.status <> :status', { status: 'CANCELLED' })
            .groupBy('DATE(booking.createdAt)')
            .orderBy('DATE(booking.createdAt)')
            .getRawMany();

        const cancelBookingLast14Days = await this.bookingRepository.createQueryBuilder('booking')
            .select('COUNT(booking.id) as amount')
            .where('booking.createdAt >= :date', { date: moment().startOf('day').subtract(14, 'days').toDate() })
            .where('booking.status = :status', { status: 'CANCELLED' })
            .getRawOne();
        const totalBookingLast14Days = await this.bookingRepository.createQueryBuilder('booking')
            .select('COUNT(booking.id) as amount')
            .where('booking.createdAt >= :date', { date: moment().startOf('day').subtract(14, 'days').toDate() })
            .getRawOne();
        const cancelBookingRate = cancelBookingLast14Days.amount / totalBookingLast14Days.amount;

        // Room data
        const roomCountByTier = await this.roomRepository.createQueryBuilder('room')
            .leftJoinAndSelect('room.roomTier', 'roomTier')
            .select('roomTier.name as tier, COUNT(room.id) as amount')
            .groupBy('roomTier.name')
            .getRawMany();

        // User data
        const customerGetPeachPointAndMapToRank = await this.userRepository.createQueryBuilder('user')
            .select('user.peachPoint as point, user.id')
            .getRawMany();
        // Rank: 0-1000: Bronze, 1001-5000: Silver, 5001-10000: Gold, >10001: Platinum
        const rankMap = {
            BRONZE: 0,
            SILVER: 0,
            GOLD: 0,
            PLATINUM: 0,
        };
        customerGetPeachPointAndMapToRank.forEach(customer => {
            if (customer.point <= 1000) {
                rankMap.BRONZE++;
            } else if (customer.point <= 5000) {
                rankMap.SILVER++;
            } else if (customer.point <= 10000) {
                rankMap.GOLD++;
            } else {
                rankMap.PLATINUM++;
            }
        });

        // Mapping missing date for booking data
        const bookingDateMap = {};
        const bookingValueDateMap = {};
        last14DaysBookingAmountEachDay.forEach(booking => {
            booking.amount = parseInt(booking.amount);
            bookingDateMap[moment(booking.date).startOf('day').toISOString()] = 1;
        });
        last14DaysBookingValueEachDay.forEach(booking => {
            booking.amount = parseInt(booking.amount);
            bookingValueDateMap[moment(booking.date).startOf('day').toISOString()] = 1;
        });
        const currentDate = moment().startOf('day').toDate();
        for (let i = 0; i < 14; i++) {
            const date = moment(currentDate).subtract(i, 'day').toISOString();
            if (!bookingDateMap[date]) {
                last14DaysBookingAmountEachDay.push({ date, amount: 0 });
            }

            if (!bookingValueDateMap[date]) {
                last14DaysBookingValueEachDay.push({ date, amount: 0 });
            }
        }

        const bookingValueDateMap30Days = {};
        last30DaysBookingValueEachDay.forEach(booking => {
            booking.amount = parseInt(booking.amount);
            bookingValueDateMap30Days[moment(booking.date).startOf('day').toISOString()] = 1;
        });
        for (let i = 0; i < 30; i++) {
            const date = moment(currentDate).subtract(i, 'day').toISOString();
            if (!bookingValueDateMap30Days[date]) {
                last30DaysBookingValueEachDay.push({ date, amount: 0 });
            }
        }

        // Sort by date
        last14DaysBookingAmountEachDay.sort((a, b) => moment(a.date).diff(moment(b.date)));
        last14DaysBookingValueEachDay.sort((a, b) => moment(a.date).diff(moment(b.date)));
        last30DaysBookingValueEachDay.sort((a, b) => moment(a.date).diff(moment(b.date)));

        return {
            totalRoom,
            totalUser,
            totalService,
            totalBooking,
            totalPayment: parseInt(totalPayment.sum),
            totalConfirmedPaymentValue: parseInt(totalConfirmedPaymentValue.sum),
            totalBookingValue: parseInt(totalBookingValue.sum),
            last14DaysBooking: last14DaysBookingAmountEachDay,
            last14DaysBookingValue: last14DaysBookingValueEachDay,
            last30DaysBookingValue: last30DaysBookingValueEachDay,
            cancelBookingRate: parseFloat(cancelBookingRate.toPrecision(2)),
            roomByTier: roomCountByTier.map(room => ({ tier: room.tier, amount: parseInt(room.amount) })),
            rankMap,
        };
    }
}