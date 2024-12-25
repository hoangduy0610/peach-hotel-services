import { ServiceTier_Dto, Service_Dto } from '@/dtos/Service_Dto';
import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceService } from 'src/services/ServiceService';

@ApiTags('service')
@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post('/tier')
    async createServiceTier(@Req() req, @Res() res, @Body() dto: ServiceTier_Dto) {
        return res.status(HttpStatus.OK).json(await this.serviceService.createServiceTier(dto));
    }

    @Get('/tier/list')
    async getServiceTiers(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.serviceService.getServiceTiers());
    }

    @Get('/tier/:id')
    async getServiceTierById(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.serviceService.getServiceTierById(req.params.id));
    }

    @Put('/tier/:id')
    async updateServiceTier(@Req() req, @Res() res, @Body() dto: ServiceTier_Dto) {
        return res.status(HttpStatus.OK).json(await this.serviceService.updateServiceTier(req.params.id, dto));
    }

    @Delete('/tier/:id')
    async deleteServiceTier(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.serviceService.deleteServiceTier(req.params.id));
    }

    @Post('/')
    async createService(@Req() req, @Res() res, @Body() dto: Service_Dto) {
        return res.status(HttpStatus.OK).json(await this.serviceService.createService(dto));
    }

    @Get('/list')
    async getServices(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.serviceService.getServices());
    }

    @Get('/:id')
    async getServiceById(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.serviceService.getServiceById(req.params.id));
    }

    @Put('/:id')
    async updateService(@Req() req, @Res() res, @Body() dto: Service_Dto) {
        return res.status(HttpStatus.OK).json(await this.serviceService.updateService(req.params.id, dto));
    }

    @Delete('/:id')
    async deleteService(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.serviceService.deleteService(req.params.id));
    }
}