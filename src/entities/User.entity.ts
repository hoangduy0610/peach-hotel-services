
import { EnumRoles } from '@/enums/EnumRoles';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, VirtualColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Booking, Rating } from './Booking.entity';
import { Coupon } from './Promote.entity';
import { PaymentHistory } from './PaymentHistory.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: '' })
    address: string;

    @Column({ default: '' })
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ default: 0 })
    peachCoin: number;

    @Column({ default: 0 })
    peachPoint: number;

    @OneToMany(() => Booking, item => item.user, { onDelete: 'CASCADE' })
    bookings: Booking[];

    @OneToMany(() => Coupon, item => item.user, { onDelete: 'CASCADE' })
    coupons: Coupon[];

    @OneToMany(() => Rating, item => item.user, { onDelete: 'CASCADE' })
    ratings: Rating[];

    @OneToMany(() => PaymentHistory, item => item.user, { onDelete: 'CASCADE' })
    paymentHistory: PaymentHistory[];
}
