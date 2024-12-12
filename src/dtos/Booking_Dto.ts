import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class RoomBookingDto {
    @ApiProperty()
    @IsNumber()
    roomId: number;

    @ApiProperty()
    @IsString()
    remark: string;
}

export class ServiceBookingDto {
    @ApiProperty()
    @IsNumber()
    serviceId: number;

    @ApiProperty()
    @IsString()
    remark: string;
}

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
    @IsString()
    checkIn: string;

    @ApiProperty()
    @IsString()
    checkOut: string;

    @ApiProperty({ isArray: true })
    rooms: RoomBookingDto[];

    @ApiProperty({ isArray: true })
    services: ServiceBookingDto[];
}
