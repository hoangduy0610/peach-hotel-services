import { ServiceTier_Dto, Service_Dto } from '@/dtos/Service_Dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
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
    async getServiceTierById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.serviceService.getServiceTierById(id));
    }

    @Put('/tier/:id')
    async updateServiceTier(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: ServiceTier_Dto) {
        return res.status(HttpStatus.OK).json(await this.serviceService.updateServiceTier(id, dto));
    }

    @Delete('/tier/:id')
    async deleteServiceTier(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.serviceService.deleteServiceTier(id));
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
    async getServiceById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.serviceService.getServiceById(id));
    }

    @Put('/:id')
    async updateService(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: Service_Dto) {
        return res.status(HttpStatus.OK).json(await this.serviceService.updateService(id, dto));
    }

    @Delete('/:id')
    async deleteService(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.serviceService.deleteService(id));
    }
}