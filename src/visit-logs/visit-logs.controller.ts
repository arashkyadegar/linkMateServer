import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { VisitLogsService } from './visit-logs.service';
import { CreateVisitLogDto } from './dto/create-visit-log.dto';
import { UpdateVisitLogDto } from './dto/update-visit-log.dto';
import { GeoLocationService } from './get-location.service';

@Controller('visit-logs')
export class VisitLogsController {
  constructor(private readonly visitLogsService: VisitLogsService,
    private readonly getLocationService: GeoLocationService
  ) { }

  @Post()
  async create(@Req() request: any) {
    return
  }

  @Get()
  findAll() {
    return this.visitLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitLogsService.findOne(+id);
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
