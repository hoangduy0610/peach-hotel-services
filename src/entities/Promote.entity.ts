import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Booking } from "./Booking.entity";

@Entity()
export class Promote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    discount: number;

    @Column() // PERCENT or AMOUNT
    type: string;

    @Column()
    startAt: Date;

    @Column()
    endAt: Date;

    @OneToMany(() => Coupon, item => item.promote)
    coupons: Coupon[];
}

@Entity()
export class Coupon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    status: string;

    @ManyToOne(() => Promote, item => item.coupons)
    promote: Promote;

    @ManyToOne(() => User, item => item.coupons)
    user: User;

    @OneToMany(() => Booking, item => item.coupon)
    booking: Booking;
}