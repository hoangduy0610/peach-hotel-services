
import { EnumRoles } from '@/enums/EnumRoles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({ type: "enum", enum: Object.keys(EnumRoles), default: EnumRoles.ROLE_USER })
    role: EnumRoles;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: '' })
    address: string;

    @Column({ default: '' })
    phone: string;
}
