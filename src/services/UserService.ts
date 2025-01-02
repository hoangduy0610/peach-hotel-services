import { ApplicationException } from '@/controllers/ExceptionController';
import { User_CreateDto } from '@/dtos/User_Dto';
import { User } from '@/entities/User.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id: id },
        });
    }

    async createUser(user: User_CreateDto): Promise<User> {
        const data = await this.userRepository.create({
            ...user,
            isActive: true,
            peachCoin: 0,
            peachPoint: 0,
        });

        return await this.userRepository.save(data);
    }

    async updateUser(id: number, user: User_CreateDto): Promise<User> {
        const oldUser = await this.userRepository.findOne({
            where: { id: id },
        });

        if (!oldUser) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        const newUser = {
            ...oldUser,
            ...user,
        };

        return await this.userRepository.save(newUser);
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        return await this.userRepository.remove(user);
    }
}