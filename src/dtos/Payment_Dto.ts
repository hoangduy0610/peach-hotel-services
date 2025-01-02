import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Payment_CreateDto {
    // @ApiProperty({ type: Number, required: true })
    // @IsNotEmpty()
    // @IsNumber()
    // amount: number;

    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsNotEmpty()
    description: string;

    // @ApiProperty({ type: String, required: true })
    // @IsString()
    // @IsNotEmpty()
    // paymentDate

    // @ApiProperty({ type: String, required: true })
    // @IsNotEmpty()
    // @IsString()
    // status: string;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    bookingId: number;
}

export class Payment_UpdateDto extends OmitType(Payment_CreateDto, ['userId', 'bookingId']) {
}