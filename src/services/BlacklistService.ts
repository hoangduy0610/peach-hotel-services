import { ApplicationException } from '@/controllers/ExceptionController';
import { Blacklist_CreateDto } from '@/dtos/Blacklist_Dto';
import { Blacklist } from '@/entities/Blacklist.entity';
import { User } from '@/entities/User.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
    constructor(
        @InjectRepository(Blacklist) private readonly blacklistRepository: Repository<Blacklist>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    async getBlacklists(): Promise<Blacklist[]> {
        return await this.blacklistRepository.find({
            relations: ['user']
        });
    }

    async getBlacklistById(id: number): Promise<Blacklist> {
        return await this.blacklistRepository.findOne({
            where: { id: id },
        });
    }

    async createBlacklist(blacklist: Blacklist_CreateDto): Promise<Blacklist> {
        const user = await this.userRepository.findOne({
            where: { id: blacklist.userId },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        user.isActive = false;

        const data = await this.blacklistRepository.create({
            user,
            reason: blacklist.reason,
            bannedAt: new Date(),
        });

        await this.userRepository.save(user);
        return await this.blacklistRepository.save(data);
    }

    async updateBlacklist(id: number, blacklist: Blacklist_CreateDto): Promise<Blacklist> {
        const oldBlacklist = await this.blacklistRepository.findOne({
            where: { id: id },
        });

        if (!oldBlacklist) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Blacklist not found');
        }

        const newBlacklist = {
            ...oldBlacklist,
            reason: blacklist.reason,
        };

        return await this.blacklistRepository.save(newBlacklist);
    }

    async deleteBlacklist(id: number): Promise<Blacklist> {
        const blacklist = await this.blacklistRepository.findOne({
            where: { id: id },
            relations: ['user'],
        });

        if (!blacklist) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Blacklist not found');
        }

        const user = await this.userRepository.findOne({
            where: { id: blacklist.user.id },
        });

        if (!user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
        }

        user.isActive = true;

        await this.userRepository.save(user);

        return await this.blacklistRepository.remove(blacklist);
    }
}