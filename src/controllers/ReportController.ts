import { ReportService } from '@/services/ReportService';
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('report')
@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Get('/system')
    async reportSystem(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.reportService.getSystemReport());
    }
}