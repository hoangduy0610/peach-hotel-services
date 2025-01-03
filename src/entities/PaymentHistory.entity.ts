
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

    @ManyToOne(() => User, user => user.paymentHistory, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Booking, booking => booking.paymentHistory, { onDelete: 'CASCADE' })
    booking: Booking;
}
