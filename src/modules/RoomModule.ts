import { Room, RoomTier } from '@/entities/Room.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from 'src/controllers/RoomController';
import { RoomService } from '../services/RoomService';
import { Booking } from '@/entities/Booking.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Room,
            RoomTier,
            Booking,
        ]),
    ],
    controllers: [RoomController],
    providers: [
        RoomService,
    ],
})
export class RoomModule { }