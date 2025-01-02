import { Blacklist_CreateDto } from '@/dtos/Blacklist_Dto';
import { RoleGuard } from '@/guards/RoleGuard';
import { BlacklistService } from '@/services/BlacklistService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('blacklist')
@Controller('blacklist')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class BlacklistController {
    constructor(private readonly blacklistService: BlacklistService) { }

    @Post('/')
    async createBlacklist(@Req() req, @Res() res, @Body() dto: Blacklist_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.blacklistService.createBlacklist(dto));
    }

    @Get('/list')
    async getBlacklists(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.blacklistService.getBlacklists());
    }

    @Get('/:id')
    async getBlacklistById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.blacklistService.getBlacklistById(id));
    }

    @Put('/:id')
    async updateBlacklist(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: Blacklist_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.blacklistService.updateBlacklist(id, dto));
    }

    @Delete('/:id')
    async deleteBlacklist(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.blacklistService.deleteBlacklist(id));
    }
}