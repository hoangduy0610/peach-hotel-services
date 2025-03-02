import { ApiProperty } from "@nestjs/swagger";
import { Auth_LoginDto } from "./Auth_LoginDto";
import { IsNotEmpty, IsString } from "class-validator";

export class Auth_RegisterDto extends Auth_LoginDto {
    @ApiProperty({ type: String, required: true })
    @IsString({ message: "Name must be a string" })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ type: String, required: true })
    @IsString({ message: "Address must be a string" })
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({ type: String, required: true })
    @IsString({ message: "Phone must be a string" })
    @IsNotEmpty()
    readonly phone: string;
}