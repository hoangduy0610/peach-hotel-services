import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room.entity";
import { Service } from "./Service.entity";
import { User } from "./User.entity";
import { Coupon } from "./Promote.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reservationCode: string;

    @Column()
    customerName: string;

    @Column()
    customerPhone: string;

    @Column()
    checkIn: Date;

    @Column()
    checkOut: Date;

    @Column()
    total: number;

    @Column()
    status: string;

    @ManyToOne(() => Coupon, item => item.booking)
    coupon: Coupon;

    @ManyToOne(() => User, item => item.bookings)
    user: User;

    @ManyToMany(() => Room, item => item.bookings)
    rooms: Room[];

    @ManyToMany(() => Service, item => item.bookings)
    services: Service[];
}

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;

    @Column()
    comment: string;

    @ManyToOne(() => User, item => item.ratings)
    user: User;

    @ManyToOne(() => Room, item => item.ratings)
    room: Room;

    @ManyToOne(() => Service, item => item.ratings)
    service: Service;
}