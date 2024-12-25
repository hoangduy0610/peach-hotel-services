import { Rating_Dto } from '@/dtos/Rating_Dto';
import { RatingService } from '@/services/RatingService';
import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rating')
@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Post('/')
    async createRating(@Req() req, @Res() res, @Body() dto: Rating_Dto) {
        return res.status(HttpStatus.OK).json(await this.ratingService.createRating(dto));
    }

    @Get('/list')
    async getRatings(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.ratingService.getRatings());
    }

    @Get('/:id')
    async getRatingById(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.ratingService.getRatingById(req.params.id));
    }

    @Put('/:id')
    async updateRating(@Req() req, @Res() res, @Body() dto: Rating_Dto) {
        return res.status(HttpStatus.OK).json(await this.ratingService.updateRating(req.params.id, dto));
    }

    @Delete('/:id')
    async deleteRating(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.ratingService.deleteRating(req.params.id));
    }
}