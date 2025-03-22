import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { UpdateShortLinkDto } from './dto/update-short-link.dto';

@Controller('short-links')
export class ShortLinksController {
  constructor(private readonly shortLinksService: ShortLinksService) {}

  @Post()
  create(@Body() createShortLinkDto: CreateShortLinkDto) {
    return this.shortLinksService.create(createShortLinkDto);
  }

  @Get()
  findAll() {
    return this.shortLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShortLinkDto: UpdateShortLinkDto) {
    return this.shortLinksService.update(+id, updateShortLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortLinksService.remove(+id);
  }
}
