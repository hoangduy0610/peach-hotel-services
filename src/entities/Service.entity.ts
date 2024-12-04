
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseServiceTier } from './BaseService';
import { Booking, Rating } from './Booking.entity';

@Entity()
export class ServiceTier extends BaseServiceTier {
    @OneToMany(() => Service, item => item.serviceTier)
    services: Service[];
}

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => ServiceTier, service => service.services)
    serviceTier: ServiceTier;

    @ManyToMany(() => Booking, item => item.services)
    bookings: Booking[];

    @OneToMany(() => Rating, item => item.service)
    ratings: Rating[];
}