import { Staff_CreateDto } from '@/dtos/Staff_Dto';
import { RoleGuard } from '@/guards/RoleGuard';
import { StaffService } from '@/services/StaffService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('staff')
@Controller('staff')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class StaffController {
    constructor(private readonly staffService: StaffService) { }

    @Post('/')
    async createStaff(@Req() req, @Res() res, @Body() dto: Staff_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.staffService.createStaff(dto));
    }

    @Get('/list')
    async getStaffs(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.staffService.getStaffs());
    }

    @Get('/:id')
    async getStaffById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.staffService.getStaffById(id));
    }

    @Put('/:id')
    async updateStaff(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: Staff_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.staffService.updateStaff(id, dto));
    }

    @Delete('/:id')
    async deleteStaff(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.staffService.deleteStaff(id));
    }
}