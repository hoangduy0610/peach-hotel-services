import { Room, RoomTier } from '@/entities/Room.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from 'src/controllers/RoomController';
import { RoomService } from '../services/RoomService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Room,
            RoomTier
        ]),
    ],
    controllers: [RoomController],
    providers: [
        RoomService,
    ],
})
export class RoomModule { }