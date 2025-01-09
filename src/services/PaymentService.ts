import { ApplicationException } from '@/controllers/ExceptionController';
import { Payment_CreateDto, Payment_UpdateDto } from '@/dtos/Payment_Dto';
import { Booking } from '@/entities/Booking.entity';
import { PaymentHistory } from '@/entities/PaymentHistory.entity';
import { User } from '@/entities/User.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPdf } from '@leninlb/nestjs-html-to-pdf';
import * as path from 'path';
import * as moment from 'moment';

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

    async exportReceipt(id: number): Promise<any> {
        const payment = await this.paymentRepository.findOne({
            where: { id: id },
            relations: ['booking', 'user', 'booking.rooms', 'booking.services', 'booking.coupon', 'booking.coupon.promote'],
        });

        if (!payment) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Payment not found');
        }

        const room = payment.booking.rooms[0];
        const roomTotalDays = moment(payment.booking.checkOut).startOf('day').diff(moment(payment.booking.checkIn).startOf('day'), 'days');

        const total = payment.booking.total;
        const totalBill = room.price * roomTotalDays + payment.booking.services.reduce((acc, service) => acc + service.price, 0);
        const totalTaxes = Math.floor(totalBill / 10);
        const totalDiscount = totalBill + totalTaxes - total;

        const data = {
            bookingCode: payment.booking.reservationCode,
            paymentDate: moment(payment.paymentDate).format('DD/MM/YYYY'),
            clientName: payment.user.name,
            clientEmail: payment.user.email,
            clientPhone: payment.user.phone,

            items: [
                {
                    id: 1,
                    name: room.name,
                    quantity: roomTotalDays,
                    price: room.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }),
                    total: (room.price * roomTotalDays).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }),
                },
                ...payment.booking.services.map((service, index) => ({
                    id: index + 2,
                    name: service.name,
                    quantity: 1,
                    price: service.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }),
                    total: service.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }),
                })),
            ],
            discount: totalDiscount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            }),
            totalBill: totalBill.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            }),
            taxes: (totalTaxes).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            }),
            total: (total).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            }),
        }
        const options = {
            format: 'A4',
            displayHeaderFooter: false,
            margin: {
                left: '10mm',
                top: '25mm',
                right: '10mm',
                bottom: '15mm',
            },
            // headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px;">@saemhco CORP</span><br><span class="date" style="font-size:15px"><span></div>`,
            // footerTemplate:
            //     '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
            landscape: false,
        };
        const filePath = path.join(process.cwd(), 'templates', 'pdf-invoice.hbs');;
        return createPdf(filePath, options, data);
    }
}