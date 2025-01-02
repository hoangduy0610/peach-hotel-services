import { User_CreateDto } from '@/dtos/User_Dto';
import { RoleGuard } from '@/guards/RoleGuard';
import { UserService } from '@/services/UserService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/')
    async createUser(@Req() req, @Res() res, @Body() dto: User_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.userService.createUser(dto));
    }

    @Get('/list')
    async getUsers(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.userService.getUsers());
    }

    @Get('/:id')
    async getUserById(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.userService.getUserById(id));
    }

    @Put('/:id')
    async updateUser(@Req() req, @Res() res, @Param('id') id: number, @Body() dto: User_CreateDto) {
        return res.status(HttpStatus.OK).json(await this.userService.updateUser(id, dto));
    }

    @Delete('/:id')
    async deleteUser(@Req() req, @Res() res, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.userService.deleteUser(id));
    }
}