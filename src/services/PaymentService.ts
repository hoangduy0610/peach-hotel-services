import { ApplicationException } from '@/controllers/ExceptionController';
import { Payment_CreateDto, Payment_UpdateDto } from '@/dtos/Payment_Dto';
import { Booking } from '@/entities/Booking.entity';
import { PaymentHistory } from '@/entities/PaymentHistory.entity';
import { User } from '@/entities/User.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentHistory) private readonly paymentRepository: Repository<PaymentHistory>,
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    async getPayments(): Promise<PaymentHistory[]> {
        return await this.paymentRepository.find({
            relations: ['booking']
        });
    }

    async getPaymentById(id: number): Promise<PaymentHistory> {
        return await this.paymentRepository.findOne({
            where: { id: id },
        });
    }

    async createPayment(payment: Payment_CreateDto): Promise<PaymentHistory> {
        const user = await this.userRepository.findOne({
            where: { id: payment.userId },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        const booking = await this.bookingRepository.findOne({
            where: { id: payment.bookingId },
        });

        if (!booking) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking not found');
        }

        const total = booking.total;

        const data = await this.paymentRepository.create({
            ...payment,
            amount: total,
            status: 'PENDING',
            paymentDate: new Date(),
            user: user,
            booking: booking,
        });

        return await this.paymentRepository.save(data);
    }

    async updatePayment(id: number, payment: Payment_UpdateDto): Promise<PaymentHistory> {
        const oldPayment = await this.paymentRepository.findOne({
            where: { id: id },
        });

        if (!oldPayment) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Payment not found');
        }

        const newPayment = {
            ...oldPayment,
            ...payment,
        };

        return await this.paymentRepository.save(newPayment);
    }

    async deletePayment(id: number): Promise<PaymentHistory> {
        const payment = await this.paymentRepository.findOne({
            where: { id: id },
        });

        if (!payment) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Payment not found');
        }

        return await this.paymentRepository.remove(payment);
    }

    async confirmPayment(id: number): Promise<PaymentHistory> {
        const payment = await this.paymentRepository.findOne({
            where: { id: id },
            relations: ['booking', 'user'],
        });

        if (!payment) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Payment not found');
        }

        payment.status = 'CONFIRMED';

        const booking = await this.bookingRepository.findOne({
            where: { id: payment.booking.id },
        });

        if (!booking) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking not found');
        }

        if (booking.status !== 'PENDING') {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Booking is not pending');
        }

        booking.status = 'CONFIRMED';

        const user = await this.userRepository.findOne({
            where: { id: payment.user.id },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        const coinToBeAdded = Math.floor(payment.amount / 1000);
        user.peachCoin += coinToBeAdded;
        user.peachPoint += coinToBeAdded;

        await this.bookingRepository.save(booking);
        await this.userRepository.save(user);
        return await this.paymentRepository.save(payment);
    }
}