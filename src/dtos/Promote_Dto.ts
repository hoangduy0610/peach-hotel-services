import { ApiProperty } from "@nestjs/swagger";

export class Promote_Dto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    startAt: Date;

    @ApiProperty()
    endAt: Date;
}

export class Coupon_Dto {
    @ApiProperty()
    promoteId: number;

    @ApiProperty()
    code: string;

    @ApiProperty()
    status: string;

    @ApiProperty({ required: false })
    userId?: number;
}