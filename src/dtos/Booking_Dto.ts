import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class Booking_Dto {
    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsString()
    customerName: string;

    @ApiProperty()
    @IsString()
    customerPhone: string;

    @ApiProperty()
    checkIn: Date;

    @ApiProperty()
    checkOut: Date;

    @ApiProperty({ isArray: true })
    roomIds: number[];

    @ApiProperty({ isArray: true })
    serviceIds: number[];
}
