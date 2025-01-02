import { ApplicationException } from '@/controllers/ExceptionController';
import { RoomTier_Dto, Room_Dto } from '@/dtos/Room_Dto';
import { Booking } from '@/entities/Booking.entity';
import { Room, RoomTier } from '@/entities/Room.entity';
import { User } from '@/entities/User.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomTier) private readonly roomTierRepository: Repository<RoomTier>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    ) {
    }

    async getRoomTiers(): Promise<RoomTier[]> {
        return await this.roomTierRepository.find({
            relations: ['rooms', 'rooms.ratings']
        });
    }

    async getRoomTierById(id: number): Promise<RoomTier> {
        return await this.roomTierRepository.findOne({
            where: { id: id },
            relations: ['rooms', 'rooms.ratings'],
        });
    }

    async createRoomTier(roomTier: RoomTier_Dto): Promise<RoomTier> {
        const data = await this.roomTierRepository.create({
            ...roomTier,
            rooms: [],
            available: roomTier.slot,
            type: 'ACCOMODATION',
        });

        return await this.roomTierRepository.save(data);
    }

    async updateRoomTier(id: number, roomTier: RoomTier_Dto): Promise<RoomTier> {
        const oldRoomTier = await this.roomTierRepository.findOne({
            where: { id: id },
        });

        if (!oldRoomTier) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room tier not found');
        }

        // if (roomTier.slot) {
        //     if (roomTier.slot < oldRoomTier.available) {
        //         throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Slot cannot be less than available');
        //     }

        //     oldRoomTier.available = roomTier.slot - (oldRoomTier.slot - oldRoomTier.available);
        // }

        const newRoomTier = {
            ...oldRoomTier,
            ...roomTier,
        };

        return await this.roomTierRepository.save(newRoomTier);
    }

    async deleteRoomTier(id: number): Promise<void> {
        const roomTier = await this.roomTierRepository.findOne({
            where: { id: id },
            relations: ['rooms', 'rooms.bookings', 'rooms.ratings'],
        });

        await this.roomTierRepository.remove(roomTier);
    }

    async getRooms(): Promise<Room[]> {
        return await this.roomRepository.find();
    }

    async filterRoomAvailable(checkInDStr: string, checkOutDStr: string, roomTierId?: number, roomGuestCapacity?: number): Promise<Room[]> {
        const checkIn = new Date(checkInDStr);
        const checkOut = new Date(checkOutDStr);

        const rooms = await this.roomRepository.find({
            relations: ['bookings', 'roomTier', 'ratings'],
        });

        return rooms.filter(room => {
            const bookings = room.bookings.filter(booking => {
                return (
                    (checkIn >= booking.checkIn && checkIn <= booking.checkOut) ||
                    (checkOut >= booking.checkIn && checkOut <= booking.checkOut) ||
                    (checkIn <= booking.checkIn && checkOut >= booking.checkOut)
                ) && booking.status != "CANCELLED";
            });

            let condition = true;

            if (roomTierId) {
                condition = condition && room.roomTier.id == roomTierId;
            }

            if (roomGuestCapacity) {
                condition = condition && room.roomTier.capacity >= roomGuestCapacity;
            }

            return condition && bookings.length === 0;
        });
    }

    async createRoom(room: Room_Dto): Promise<Room> {
        const roomTier = await this.roomTierRepository.findOne({
            where: { id: room.roomTierId },
        });

        if (!roomTier) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room tier not found');
        }

        const data = await this.roomRepository.create({
            ...room,
            roomTier: roomTier,
        });

        return await this.roomRepository.save(data);
    }

    async updateRoom(id: number, room: Room_Dto): Promise<Room> {
        const oldRoom = await this.roomRepository.findOne({
            where: { id: id },
        });

        if (!oldRoom) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room not found');
        }

        const roomTier = await this.roomTierRepository.findOne({
            where: { id: room.roomTierId },
        });

        if (!roomTier) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room tier not found');
        }

        const newRoom = {
            ...oldRoom,
            ...room,
            roomTier: roomTier,
        };

        return await this.roomRepository.save(newRoom);
    }

    async deleteRoom(id: number): Promise<void> {
        const room = await this.roomRepository.findOne({
            where: { id: id },
            relations: ['bookings', 'ratings'],
        });

        await this.roomRepository.delete(room);
    }

    async getRoomById(id: number): Promise<Room> {
        return await this.roomRepository.findOne({
            where: { id: id },
            relations: ['roomTier', "ratings"],
        });
    }
}