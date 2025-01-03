import { ApplicationException } from '@/controllers/ExceptionController';
import { Coupon_Dto, Promote_Dto } from '@/dtos/Promote_Dto';
import { Coupon, Promote } from '@/entities/Promote.entity';
import { User } from '@/entities/User.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PromoteService {
    constructor(
        @InjectRepository(Promote) private readonly promoteRepository: Repository<Promote>,
        @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    async getPromotes(): Promise<Promote[]> {
        return await this.promoteRepository.find();
    }

    async getPromoteById(id: number): Promise<Promote> {
        return await this.promoteRepository.findOne({
            where: { id: id },
            relations: ['coupons'],
        });
    }

    async createPromote(promote: Promote_Dto): Promise<Promote> {
        const data = await this.promoteRepository.create({
            ...promote,
            coupons: [],
        });

        return await this.promoteRepository.save(data);
    }

    async updatePromote(id: number, promote: Promote_Dto): Promise<Promote> {
        const oldPromote = await this.promoteRepository.findOne({
            where: { id: id },
        });

        if (!oldPromote) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Coupon tier not found');
        }

        // if (promote.slot) {
        //     if (promote.slot < oldPromote.available) {
        //         throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Slot cannot be less than available');
        //     }

        //     oldPromote.available = promote.slot - (oldPromote.slot - oldPromote.available);
        // }

        const newPromote = {
            ...oldPromote,
            ...promote,
        };

        return await this.promoteRepository.save(newPromote);
    }

    async deletePromote(id: number): Promise<void> {
        const promote = await this.promoteRepository.findOne({
            where: { id: id },
            relations: ['coupons'],
        });

        await this.promoteRepository.remove(promote);
    }

    async getCoupons(): Promise<Coupon[]> {
        return await this.couponRepository.find({
            relations: ['promote']
        });
    }

    async createCoupon(coupon: Coupon_Dto): Promise<Coupon> {
        const promote = await this.promoteRepository.findOne({
            where: { id: coupon.promoteId },
        });

        if (!promote) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Coupon tier not found');
        }

        const data = await this.couponRepository.create({
            ...coupon,
            promote: promote,
            status: 'ACTIVE',
        });

        if (coupon.userId) {
            const user = await this.userRepository.findOne({
                where: { id: coupon.userId },
            });

            if (!user) {
                throw new ApplicationException(HttpStatus.BAD_REQUEST, 'User not found');
            }

            data.user = user;
        }

        return await this.couponRepository.save(data);
    }

    async updateCoupon(id: number, coupon: Coupon_Dto): Promise<Coupon> {
        const oldCoupon = await this.couponRepository.findOne({
            where: { id: id },
        });

        if (!oldCoupon) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Coupon not found');
        }

        const promote = await this.promoteRepository.findOne({
            where: { id: coupon.promoteId },
        });

        if (!promote) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Coupon tier not found');
        }

        const newCoupon = {
            ...oldCoupon,
            ...coupon,
            promote: promote,
        };

        return await this.couponRepository.save(newCoupon);
    }

    async deleteCoupon(id: number): Promise<void> {
        const counpon = await this.couponRepository.findOne({
            where: { id: id }
        })
        await this.couponRepository.remove(counpon);
    }

    async getCouponById(id: number): Promise<Coupon> {
        return await this.couponRepository.findOne({
            where: { id: id },
            relations: ['promote'],
        });
    }
}