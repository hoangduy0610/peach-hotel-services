import { IsString, IsNumber } from "class-validator";

export class ServiceTier_Dto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsString()
    description: string;

    @IsNumber()
    slot: number;
}

export class Service_Dto {
    @IsNumber()
    serviceTierId: number;

    @IsString()
    name: string;

    @IsNumber()
    price: number;
}
