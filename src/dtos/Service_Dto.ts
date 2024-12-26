import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class ServiceTier_Dto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    slot: number;
}

export class Service_Dto {
    @ApiProperty()
    @IsNumber()
    serviceTierId: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    price: number;
}
