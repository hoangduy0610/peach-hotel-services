
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseUser {
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
}
