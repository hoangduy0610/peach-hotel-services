import { Booking } from '@/entities/Booking.entity';
import { PaymentHistory } from '@/entities/PaymentHistory.entity';
import { Room } from '@/entities/Room.entity';
import { Service } from '@/entities/Service.entity';
import { User } from '@/entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from 'src/controllers/ReportController';
import { ReportService } from '../services/ReportService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Booking,
            User,
            Room,
            Service,
            PaymentHistory,
        ]),
    ],
    controllers: [ReportController],
    providers: [
        ReportService,
    ],
})
export class ReportModule { }