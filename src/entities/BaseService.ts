import { PrimaryGeneratedColumn, Column } from "typeorm";

export class BaseServiceTier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column("text", { array: true })
    images: string[];

    @Column()
    slot: number;

    @Column()
    available: number;
}