import { Booking_Dto } from '@/dtos/Booking_Dto';
import { BookingService } from '@/services/BookingService';
import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post('/')
    async createBooking(@Req() req, @Res() res, @Body() dto: Booking_Dto) {
        return res.status(HttpStatus.OK).json(await this.bookingService.createBooking(dto));
    }

    @Post('/coupon/:id')
    async applyCoupon(@Req() req, @Res() res, @Query('code') code: string) {
        return res.status(HttpStatus.OK).json(await this.bookingService.applyCoupon(req.params.id, code));
    }

    @Get('/list')
    async getBookings(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.bookingService.getBookings());
    }

    @Get('/:id')
    async getBookingById(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.bookingService.getBookingById(req.params.id));
    }

    @Put('/:id')
    async updateBooking(@Req() req, @Res() res, @Body() dto: Booking_Dto) {
        return res.status(HttpStatus.OK).json(await this.bookingService.updateBooking(req.params.id, dto));
    }

    @Delete('/:id')
    async deleteBooking(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.bookingService.deleteBooking(req.params.id));
    }
}