import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { VisitLogsService } from './visit-logs.service';
import { UpdateVisitLogDto } from './dto/update-visit-log.dto';

@Controller('visit-logs')
export class VisitLogsController {
  constructor(private readonly visitLogsService: VisitLogsService
  ) { }

  @Post()
  async create(@Req() request: any) {
    return
  }

  @Get(':id')
  async findAllByLinkId(@Param('id') id: string, @Req() req: any, @Query() query: Record<string, any>) {
    console.log('hello')
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    return await this.visitLogsService.findAllByLinkId(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitLogDto: UpdateVisitLogDto) {
    return this.visitLogsService.update(+id, updateVisitLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitLogsService.remove(+id);
  }
}
