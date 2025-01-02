import { Promote_Dto, Coupon_Dto } from '@/dtos/Promote_Dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PromoteService } from 'src/services/PromoteService';

@ApiTags('promote')
@Controller('promote')
export class PromoteController {
    constructor(private readonly promoteService: PromoteService) { }

    @Post('/')
    async createPromote(@Req() req, @Res() res, @Body() dto: Promote_Dto) {
        return res.status(HttpStatus.OK).json(await this.promoteService.createPromote(dto));
    }

    @Get('/list')
    async getPromotes(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.promoteService.getPromotes());
    }

    @Get('/:id')
    async getPromoteById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.promoteService.getPromoteById(id));
    }

    @Put('/:id')
    async updatePromote(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: Promote_Dto) {
        return res.status(HttpStatus.OK).json(await this.promoteService.updatePromote(id, dto));
    }

    @Delete('/:id')
    async deletePromote(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.promoteService.deletePromote(id));
    }

    @Post('/coupon')
    async createCoupon(@Req() req, @Res() res, @Body() dto: Coupon_Dto) {
        return res.status(HttpStatus.OK).json(await this.promoteService.createCoupon(dto));
    }

    @Get('/coupon/list')
    async getCoupons(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.promoteService.getCoupons());
    }

    @Get('/coupon/:id')
    async getCouponById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.promoteService.getCouponById(id));
    }

    @Put('/coupon/:id')
    async updateCoupon(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: Coupon_Dto) {
        return res.status(HttpStatus.OK).json(await this.promoteService.updateCoupon(id, dto));
    }

    @Delete('/coupon/:id')
    async deleteCoupon(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.promoteService.deleteCoupon(id));
    }
}