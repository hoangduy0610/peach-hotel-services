
import { EnumRoles } from '@/enums/EnumRoles';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Booking, Rating } from './Booking.entity';
import { Coupon } from './Promote.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({ type: "enum", enum: Object.keys(EnumRoles), default: EnumRoles.ROLE_USER })
    role: EnumRoles;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Booking, item => item.user)
    bookings: Booking[];

    @OneToMany(() => Coupon, item => item.user)
    coupons: Coupon[];

    @OneToMany(() => Rating, item => item.user)
    ratings: Rating[];
}
