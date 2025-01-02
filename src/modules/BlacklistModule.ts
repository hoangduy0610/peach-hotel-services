import { Blacklist } from '@/entities/Blacklist.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistController } from 'src/controllers/BlacklistController';
import { BlacklistService } from '../services/BlacklistService';
import { User } from '@/entities/User.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Blacklist,
            User,
        ]),
    ],
    controllers: [BlacklistController],
    providers: [
        BlacklistService,
    ],
})
export class BlacklistModule { }