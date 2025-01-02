import { Payment_CreateDto } from '@/dtos/Payment_Dto';
import { RoleGuard } from '@/guards/RoleGuard';
import { PaymentService } from '@/services/PaymentService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('/')
    async createPayment(@Req() req, @Res() res, @Body() dto: Payment_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.paymentService.createPayment(dto));
    }

    @Post('/confirm/:id')
    async confirmPayment(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.paymentService.confirmPayment(id));
    }

    @Get('/list')
    async getPayments(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.paymentService.getPayments());
    }

    @Get('/:id')
    async getPaymentById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.paymentService.getPaymentById(id));
    }

    @Put('/:id')
    async updatePayment(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: Payment_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.paymentService.updatePayment(id, dto));
    }

    @Delete('/:id')
    async deletePayment(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.paymentService.deletePayment(id));
    }
}