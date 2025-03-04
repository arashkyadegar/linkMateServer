import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateBioLinkDto } from './create-biolink.dto';
import { BioLinksService } from './bio-links.service';

@Controller('bio-links')
export class BioLinksController {
  constructor(private readonly bioLinksService: BioLinksService) {}

  @Post()
  createOne(@Body() createBioLinkDto: CreateBioLinkDto) {
    return this.bioLinksService.createBioLink(createBioLinkDto);
  }

  @Get()
  findAll() {
    return this.bioLinksService.findAllBioLink();
  }
}
