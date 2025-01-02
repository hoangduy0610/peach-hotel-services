import { Booking_Dto } from '@/dtos/Booking_Dto';
import { RoleGuard } from '@/guards/RoleGuard';
import { BookingService } from '@/services/BookingService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post('/')
    async createBooking(@Req() req, @Res() res, @Body() dto: Booking_Dto) {
        return res.status(HttpStatus.OK).json(await this.bookingService.createBooking(dto));
    }

    @Post('/coupon/:id')
    async applyCoupon(@Req() req, @Res() res, @Query('code') code: string, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookingService.applyCoupon(id, code));
    }

    @Post('/peach-coin/:id')
    async applyPeachCoin(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookingService.applyPeachCoin(req.user.id, id));
    }

    @Post('/cancel/:id')
    async cancelBooking(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookingService.cancelBooking(id));
    }

    @Put('/check-in/:id')
    async checkIn(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookingService.checkIn(id));
    }

    @Put('/check-out/:id')
    async checkOut(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookingService.checkOut(id));
    }

    @Get('/list')
    async getBookings(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.bookingService.getBookings(req.user));
    }

    @Get('/:id')
    async getBookingById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookingService.getBookingById(id));
    }

    @Put('/:id')
    async updateBooking(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: Booking_Dto) {
        return res.status(HttpStatus.OK).json(await this.bookingService.updateBooking(id, dto));
    }

    @Delete('/:id')
    async deleteBooking(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookingService.deleteBooking(id));
    }
}