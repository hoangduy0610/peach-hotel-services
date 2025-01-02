
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Blacklist {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    user: User;

    @Column({ nullable: true })
    reason: string;

    @Column()
    bannedAt: Date;
}
