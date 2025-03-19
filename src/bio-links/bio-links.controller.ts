import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBioLinkDto, UpdateBioLinkDto } from './create-biolink.dto';
import { BioLinksService } from './bio-links.service';
import {
  createOneBioLink,
  deleteOneBioLink,
  findAllBioLinks,
  updateOneBioLink,
} from './custom-decorator/swagger-decorator';

@Controller('bio-links')
export class BioLinksController {
  constructor(private readonly bioLinksService: BioLinksService) {}

  @createOneBioLink()
  @Post()
  createOne(@Body() createBioLinkDto: CreateBioLinkDto, @Req() req: any) {
    createBioLinkDto.userId = req.userId; //this is extracted from cookie in cookieMiddleware
    return this.bioLinksService.createBioLink(createBioLinkDto);
  }

  @findAllBioLinks()
  @Get()
  findAll(@Req() req: any) {
    ///must define types ...i dont know it
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    return this.bioLinksService.findAllBioLink();
  }

  @updateOneBioLink()
  @Put('/:id')
  updateOne(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateBioLinkDto: UpdateBioLinkDto,
  ) {
    return this.bioLinksService.updateBioLink(id, updateBioLinkDto);
  }

  @deleteOneBioLink()
  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.bioLinksService.deleteBioLink(id);
  }
}
