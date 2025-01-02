import { ApiProperty } from "@nestjs/swagger";
import { Auth_LoginDto } from "./Auth_LoginDto";
import { IsString, IsNotEmpty } from "class-validator";
import { EnumRoles } from "@/enums/EnumRoles";

export class Staff_CreateDto extends Auth_LoginDto {
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

    @ApiProperty({ type: String, required: true, enum: Object.values(EnumRoles) })
    @IsNotEmpty()
    readonly role: EnumRoles;
}