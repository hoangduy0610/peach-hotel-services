
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';
import { Booking } from './Booking.entity';

@Entity()
export class PaymentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    description: string;

    @Column()
    paymentDate: Date;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.paymentHistory)
    user: User;

    @ManyToOne(() => Booking, booking => booking.paymentHistory)
    booking: Booking;
}
