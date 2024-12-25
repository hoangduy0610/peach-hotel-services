import { Room } from '@/entities/Room.entity';
import { Service } from '@/entities/Service.entity';
import { User } from '@/entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from 'src/controllers/RatingController';
import { RatingService } from '../services/RatingService';
import { Rating } from '@/entities/Booking.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Rating,
            User,
            Room,
            Service,
        ]),
    ],
    controllers: [RatingController],
    providers: [
        RatingService,
    ],
})
export class RatingModule { }