import { Booking } from '@/entities/Booking.entity';
import { Coupon } from '@/entities/Promote.entity';
import { Room } from '@/entities/Room.entity';
import { Service } from '@/entities/Service.entity';
import { User } from '@/entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from 'src/controllers/BookingController';
import { BookingService } from '../services/BookingService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Booking,
            Room,
            User,
            Service,
            Coupon,
        ]),
    ],
    controllers: [BookingController],
    providers: [
        BookingService,
    ],
})
export class BookingModule { }