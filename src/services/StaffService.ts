import { Constant } from '@/commons/Constant';
import { ApplicationException } from '@/controllers/ExceptionController';
import { Staff_CreateDto, Staff_UpdateDto } from '@/dtos/Staff_Dto';
import { Staff } from '@/entities/Staff.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt');

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff) private readonly staffRepository: Repository<Staff>
    ) {
    }

    async getStaffs(): Promise<Staff[]> {
        return await this.staffRepository.find();
    }

    async getStaffById(id: number): Promise<Staff> {
        return await this.staffRepository.findOne({
            where: { id: id },
        });
    }

    async createStaff(staff: Staff_CreateDto): Promise<Staff> {
        const data = await this.staffRepository.create({
            ...staff,
            password: await bcrypt.hashSync(staff.password, Constant.BCRYPT_ROUND)
        });

        return await this.staffRepository.save(data);
    }

    async updateStaff(id: number, staff: Staff_UpdateDto): Promise<Staff> {
        const oldStaff = await this.staffRepository.findOne({
            where: { id: id },
        });

        if (!oldStaff) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Staff not found');
        }

        const newStaff = {
            ...oldStaff,
            ...staff,
        };

        return await this.staffRepository.save(newStaff);
    }

    async deleteStaff(id: number): Promise<Staff> {
        const staff = await this.staffRepository.findOne({
            where: { id: id },
        });

        if (!staff) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Staff not found');
        }

        return await this.staffRepository.remove(staff);
    }
}