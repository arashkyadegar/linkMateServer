import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TimeLinksService } from './time-links.service';
import { CreateTimeLinkDto } from './dto/create-time-link.dto';
import { UpdateTimeLinkDto } from './dto/update-time-link.dto';

@Controller('time-links')
export class TimeLinksController {
  constructor(private readonly timeLinksService: TimeLinksService) {}

  @Post()
  create(@Body() createTimeLinkDto: CreateTimeLinkDto, @Req() req: any) {
    createTimeLinkDto.userId = req.userId;
    return this.timeLinksService.create(createTimeLinkDto);
  }

  @Get()
  findAll() {
    // return this.timeLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.timeLinksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeLinkDto: UpdateTimeLinkDto,
  ) {
    // return this.timeLinksService.update(+id, updateTimeLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeLinksService.remove(+id);
  }
}
