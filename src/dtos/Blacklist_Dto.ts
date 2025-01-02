import { ApiProperty } from "@nestjs/swagger";

export class Blacklist_CreateDto {
    @ApiProperty({ type: Number, required: true })
    readonly userId: number;

    @ApiProperty({ type: String, required: true })
    readonly reason: string;
}