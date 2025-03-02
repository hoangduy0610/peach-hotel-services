import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room.entity";
import { Service } from "./Service.entity";
import { User } from "./User.entity";
import { Coupon } from "./Promote.entity";
import { PaymentHistory } from "./PaymentHistory.entity";

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

    @Column({ default: 0 })
    peachCoinApplied: number;

    @Column()
    checkIn: Date;

    @Column()
    checkOut: Date;

    @Column({ nullable: true })
    realCheckIn: Date;

    @Column({ nullable: true })
    realCheckOut: Date;

    @Column()
    total: number;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Coupon, item => item.booking)
    coupon: Coupon;

    @ManyToOne(() => User, item => item.bookings, { onDelete: 'CASCADE' })
    user: User;

    @ManyToMany(() => Room, item => item.bookings, { onDelete: 'CASCADE' })
    @JoinTable()
    rooms: Room[];

    @ManyToMany(() => Service, item => item.bookings, { onDelete: 'CASCADE' })
    @JoinTable()
    services: Service[];

    @OneToMany(() => PaymentHistory, item => item.booking)
    paymentHistory: PaymentHistory;
}

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;

    @Column()
    comment: string;

    @ManyToOne(() => User, item => item.ratings, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Room, item => item.ratings, { onDelete: 'CASCADE' })
    room: Room;

    @ManyToOne(() => Service, item => item.ratings, { onDelete: 'CASCADE' })
    service: Service;
}