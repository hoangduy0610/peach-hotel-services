import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm";
import { BaseServiceTier } from "./BaseService";
import { Booking, Rating } from "./Booking.entity";

@Entity()
export class RoomTier extends BaseServiceTier {
    @Column()
    capacity: number;

    @OneToMany(() => Room, item => item.roomTier)
    rooms: Room[];
}

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    floor: number;

    @Column()
    price: number;

    @Column()
    isBalcony: boolean;

    @Column()
    isBathroom: boolean;

    @Column()
    isAirConditioner: boolean;

    @Column()
    isFreeWifi: boolean;

    @Column()
    isTelevision: boolean;

    @Column()
    isRefrigerator: boolean;

    @Column()
    isBreakfast: boolean;

    @Column()
    isLunch: boolean;

    @Column()
    isDinner: boolean;

    @Column()
    isSnack: boolean;

    @Column()
    isDrink: boolean;

    @Column()
    isParking: boolean;

    @Column()
    isSwimmingPool: boolean;

    @Column()
    isGym: boolean;

    @Column()
    isSpa: boolean;

    @Column()
    isLaundry: boolean;

    @Column()
    isCarRental: boolean;

    @Column()
    isBusService: boolean;

    @ManyToOne(() => RoomTier, item => item.rooms)
    roomTier: RoomTier;

    @ManyToMany(() => Booking, item => item.rooms)
    bookings: Booking[];

    @OneToMany(() => Rating, item => item.room)
    ratings: Rating[];
}