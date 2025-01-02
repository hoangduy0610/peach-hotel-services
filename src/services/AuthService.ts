import { Auth_RegisterDto } from '@/dtos/Auth_RegisterDto';
import { Staff } from '@/entities/Staff.entity';
import { User } from '@/entities/User.entity';
import { EnumRoles } from '@/enums/EnumRoles';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Constant } from 'src/commons/Constant';
import { MessageCode } from 'src/commons/MessageCode';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { Auth_LoginDto } from 'src/dtos/Auth_LoginDto';
import { UserModal } from 'src/models/User';
import { StringUtils } from 'src/utils/StringUtils';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Staff) private readonly staffRepository: Repository<Staff>,
        private readonly jwtService: JwtService
    ) {
    }

    async register(dto: Auth_RegisterDto): Promise<UserModal> {
        const { email, password, name } = dto;
        const user = await this.userRepository.findOne({ where: { email: email }, withDeleted: false });
        if (user) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.USER_ALREADY_EXISTED);
        }

        try {
            const hash = bcrypt.hashSync(password, Constant.BCRYPT_ROUND);
            const res = await this.userRepository.create({
                email: email,
                password: hash,
                // role: EnumRoles.ROLE_USER,
                phone: dto.phone,
                name: name,
                address: dto.address,
                isActive: true,
                peachCoin: 0,
                peachPoint: 0,
            })
            await this.userRepository.save(res);

            return new UserModal(res);
        } catch (error) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_CREATE_ERROR);
        }
    }

    async login(userAuthDto: Auth_LoginDto): Promise<any> {
        const safeEmail = StringUtils.xssPrevent(userAuthDto.email);
        const safePassword = StringUtils.xssPrevent(userAuthDto.password);
        const user = await this.userRepository.findOne({ where: { email: safeEmail }, withDeleted: false });

        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_REGISTER);
        }

        if (!bcrypt.compareSync(safePassword, user.password)) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG);
        }

        if (!user.isActive) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_BANNED);
        }

        const userData = new UserModal(user);

        const JWT_Payload = {
            id: user.id,
            email: user.email,
            role: EnumRoles.ROLE_USER,
            name: user.name,
            phone: user.phone,
            address: user.address,
        }

        try {
            const JWT = this.jwtService.sign(JWT_Payload);
            return { token: JWT, info: userData };
        } catch (e) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG)
        }
    }

    async loginAdmin(userAuthDto: Auth_LoginDto): Promise<any> {
        const safeEmail = StringUtils.xssPrevent(userAuthDto.email);
        const safePassword = StringUtils.xssPrevent(userAuthDto.password);
        const staff = await this.staffRepository.findOne({ where: { email: safeEmail }, withDeleted: false });

        if (!staff) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_REGISTER);
        }

        if (!bcrypt.compareSync(safePassword, staff.password)) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG);
        }

        const JWT_Payload = {
            id: staff.id,
            email: staff.email,
            role: staff.role,
            name: staff.name,
            phone: staff.phone,
            address: staff.address,
        }

        try {
            const JWT = this.jwtService.sign(JWT_Payload);
            return { token: JWT, info: JWT_Payload };
        } catch (e) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG)
        }
    }

    async validateUser(payload: any): Promise<User> {
        return await this.userRepository.findOne({ where: { id: payload.id }, withDeleted: false });
    }

    async validateAdmin(payload: any): Promise<Staff> {
        return await this.staffRepository.findOne({ where: { id: payload.id }, withDeleted: false });
    }
}