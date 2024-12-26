import { IsBoolean, IsNumber, IsString } from "class-validator";
import { ServiceTier_Dto } from "./Service_Dto";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class RoomTier_Dto extends OmitType(ServiceTier_Dto, ['type']) {
    @ApiProperty()
    @IsNumber()
    capacity: number;
}

export class Room_Dto {
    @ApiProperty()
    @IsNumber()
    roomTierId: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    floor: number;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsBoolean()
    isBalcony: boolean;

    @ApiProperty()
    @IsBoolean()
    isBathroom: boolean;

    @ApiProperty()
    @IsBoolean()
    isAirConditioner: boolean;

    @ApiProperty()
    @IsBoolean()
    isFreeWifi: boolean;

    @ApiProperty()
    @IsBoolean()
    isTelevision: boolean;

    @ApiProperty()
    @IsBoolean()
    isRefrigerator: boolean;

    @ApiProperty()
    @IsBoolean()
    isBreakfast: boolean;

    @ApiProperty()
    @IsBoolean()
    isLunch: boolean;

    @ApiProperty()
    @IsBoolean()
    isDinner: boolean;

    @ApiProperty()
    @IsBoolean()
    isSnack: boolean;

    @ApiProperty()
    @IsBoolean()
    isDrink: boolean;

    @ApiProperty()
    @IsBoolean()
    isParking: boolean;

    @ApiProperty()
    @IsBoolean()
    isSwimmingPool: boolean;

    @ApiProperty()
    @IsBoolean()
    isGym: boolean;

    @ApiProperty()
    @IsBoolean()
    isSpa: boolean;

    @ApiProperty()
    @IsBoolean()
    isLaundry: boolean;

    @ApiProperty()
    @IsBoolean()
    isCarRental: boolean;

    @ApiProperty()
    @IsBoolean()
    isBusService: boolean;
}
