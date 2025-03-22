import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OneTimeLinksService } from './one-time-links.service';
import { CreateOneTimeLinkDto } from './dto/create-one-time-link.dto';
import { UpdateOneTimeLinkDto } from './dto/update-one-time-link.dto';

@Controller('one-time-links')
export class OneTimeLinksController {
  constructor(private readonly oneTimeLinksService: OneTimeLinksService) {}

  @Post()
  create(@Body() createOneTimeLinkDto: CreateOneTimeLinkDto) {
    return this.oneTimeLinksService.create(createOneTimeLinkDto);
  }

  @Get()
  findAll() {
    return this.oneTimeLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oneTimeLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOneTimeLinkDto: UpdateOneTimeLinkDto) {
    return this.oneTimeLinksService.update(+id, updateOneTimeLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oneTimeLinksService.remove(+id);
  }
}
