import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { Constant } from '../commons/Constant';
import { ApplicationException } from '../controllers/ExceptionController';
import { MessageCode } from '../commons/MessageCode';
import { EnumRoles } from '@/enums/EnumRoles';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Constant.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const isAdmin = payload.role != EnumRoles.ROLE_USER;
        const user = isAdmin ? await this.authService.validateAdmin(payload) : await this.authService.validateUser(payload);
        if (!user) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_NOT_FOUND);
        }
        return user;
    }
}