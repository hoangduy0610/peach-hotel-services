import { ApplicationException } from '@/controllers/ExceptionController';
import { Rating_Dto } from '@/dtos/Rating_Dto';
import { Rating } from '@/entities/Booking.entity';
import { Room } from '@/entities/Room.entity';
import { Service } from '@/entities/Service.entity';
import { User } from '@/entities/User.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
    ) {
    }

    async getRatings(): Promise<Rating[]> {
        return await this.ratingRepository.find({
            relations: ['user', 'room', 'service']
        });
    }

    async getRatingById(id: number): Promise<Rating> {
        return await this.ratingRepository.findOne({
            where: { id: id },
            relations: ['user', 'room', 'service'],
        });
    }

    async createRating(rating: Rating_Dto): Promise<Rating> {
        const user = await this.userRepository.findOne({
            where: { id: rating.userId },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        if (!rating.roomId && !rating.serviceId) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'At least one service is required');
        }

        const data = await this.ratingRepository.create({
            ...rating,
            user: user,
        });

        if (rating.roomId) {
            const room = await this.roomRepository.findOne({
                where: { id: rating.roomId },
            });

            if (!room) {
                throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room not found');
            }

            data.room = room;
        }

        if (rating.serviceId) {
            const service = await this.serviceRepository.findOne({
                where: { id: rating.serviceId },
            });

            if (!service) {
                throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service not found');
            }

            data.service = service;
        }

        return await this.ratingRepository.save(data);
    }

    async updateRating(id: number, rating: Pick<Rating_Dto, 'score' | 'comment'>): Promise<Rating> {
        const oldRating = await this.ratingRepository.findOne({
            where: { id: id },
        });

        if (!oldRating) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Room tier not found');
        }

        // if (rating.slot) {
        //     if (rating.slot < oldRating.available) {
        //         throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Slot cannot be less than available');
        //     }

        //     oldRating.available = rating.slot - (oldRating.slot - oldRating.available);
        // }

        const dataUpdate = {
            score: rating.score,
            comment: rating.comment,
        }

        const newRating = {
            ...oldRating,
            ...rating,
        };

        return await this.ratingRepository.save(newRating);
    }

    async deleteRating(id: number): Promise<void> {
        const rating = await this.ratingRepository.findOne({
            where: { id: id },
        });

        await this.ratingRepository.delete(rating);
    }
}