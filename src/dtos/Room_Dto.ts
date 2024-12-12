import { IsBoolean, IsNumber, IsString } from "class-validator";
import { ServiceTier_Dto } from "./Service_Dto";
import { OmitType } from "@nestjs/swagger";

export class RoomTier_Dto extends OmitType(ServiceTier_Dto, ['type']) {
    @IsNumber()
    capacity: number;
}

export class Room_Dto {
    @IsNumber()
    roomTierId: number;

    @IsString()
    name: string;

    @IsNumber()
    floor: number;

    @IsNumber()
    price: number;

    @IsBoolean()
    isBalcony: boolean;

    @IsBoolean()
    isBathroom: boolean;

    @IsBoolean()
    isAirConditioner: boolean;

    @IsBoolean()
    isFreeWifi: boolean;

    @IsBoolean()
    isTelevision: boolean;

    @IsBoolean()
    isRefrigerator: boolean;

    @IsBoolean()
    isBreakfast: boolean;

    @IsBoolean()
    isLunch: boolean;

    @IsBoolean()
    isDinner: boolean;

    @IsBoolean()
    isSnack: boolean;

    @IsBoolean()
    isDrink: boolean;

    @IsBoolean()
    isParking: boolean;

    @IsBoolean()
    isSwimmingPool: boolean;

    @IsBoolean()
    isGym: boolean;

    @IsBoolean()
    isSpa: boolean;

    @IsBoolean()
    isLaundry: boolean;

    @IsBoolean()
    isCarRental: boolean;

    @IsBoolean()
    isBusService: boolean;
}
