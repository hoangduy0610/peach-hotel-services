import { PaymentHistory } from '@/entities/PaymentHistory.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/controllers/PaymentController';
import { PaymentService } from '../services/PaymentService';
import { Booking } from '@/entities/Booking.entity';
import { User } from '@/entities/User.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentHistory,
            Booking,
            User,
        ]),
    ],
    controllers: [PaymentController],
    providers: [
        PaymentService,
    ],
})
export class PaymentModule { }