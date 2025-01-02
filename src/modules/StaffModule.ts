import { Staff } from '@/entities/Staff.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffController } from 'src/controllers/StaffController';
import { StaffService } from '../services/StaffService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Staff,
        ]),
    ],
    controllers: [StaffController],
    providers: [
        StaffService,
    ],
})
export class StaffModule { }