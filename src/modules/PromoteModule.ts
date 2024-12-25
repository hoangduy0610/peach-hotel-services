import { Coupon, Promote } from '@/entities/Promote.entity';
import { User } from '@/entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoteController } from 'src/controllers/PromoteController';
import { PromoteService } from '../services/PromoteService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Promote,
            User,
            Coupon,
        ]),
    ],
    controllers: [PromoteController],
    providers: [
        PromoteService,
    ],
})
export class PromoteModule { }