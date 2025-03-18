import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBioLinkDto, UpdateBioLinkDto } from './create-biolink.dto';
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

  @Put('/:id')
  updateOne(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateBioLinkDto: UpdateBioLinkDto,
  ) {
    return this.bioLinksService.updateBioLink(id, updateBioLinkDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: number) {
    return this.bioLinksService.deleteBioLink(id);
  }
}
