
import { EnumRoles } from '@/enums/EnumRoles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseUser } from './BaseUser';

@Entity()
export class Staff extends BaseUser {
    @Column({ type: "enum", enum: Object.keys(EnumRoles), default: EnumRoles.ROLE_USER })
    role: EnumRoles;
}
