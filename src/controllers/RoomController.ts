import { RoomTier_Dto, Room_Dto } from '@/dtos/Room_Dto';
import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomService } from 'src/services/RoomService';

@ApiTags('room')
@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post('/tier')
    async createRoomTier(@Req() req, @Res() res, @Body() dto: RoomTier_Dto) {
        return res.status(HttpStatus.OK).json(await this.roomService.createRoomTier(dto));
    }

    @Get('/tier/list')
    async getRoomTiers(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.roomService.getRoomTiers());
    }

    @Get('/tier/:id')
    async getRoomTierById(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.roomService.getRoomTierById(req.params.id));
    }

    @Put('/tier/:id')
    async updateRoomTier(@Req() req, @Res() res, @Body() dto: RoomTier_Dto) {
        return res.status(HttpStatus.OK).json(await this.roomService.updateRoomTier(req.params.id, dto));
    }

    @Delete('/tier/:id')
    async deleteRoomTier(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.roomService.deleteRoomTier(req.params.id));
    }

    @Post('/')
    async createRoom(@Req() req, @Res() res, @Body() dto: Room_Dto) {
        return res.status(HttpStatus.OK).json(await this.roomService.createRoom(dto));
    }

    @Get('/list')
    async getRooms(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.roomService.getRooms());
    }

    @Get('/:id')
    async getRoomById(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.roomService.getRoomById(req.params.id));
    }

    @Put('/:id')
    async updateRoom(@Req() req, @Res() res, @Body() dto: Room_Dto) {
        return res.status(HttpStatus.OK).json(await this.roomService.updateRoom(req.params.id, dto));
    }

    @Delete('/:id')
    async deleteRoom(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.roomService.deleteRoom(req.params.id));
    }
}