import { OmitType } from '@nestjs/swagger';
import { Auth_RegisterDto } from './Auth_RegisterDto';

export class User_CreateDto extends Auth_RegisterDto {
}

export class User_UpdateDto extends OmitType(User_CreateDto, ['password'] as const) {

}