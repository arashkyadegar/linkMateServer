import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { EnvConfigService } from 'src/env-config/env-config.service';

@Controller('bio-links')
export class BioLinksController {
  constructor(
    private readonly bioLinksService: BioLinksService,
    private envConfigService: EnvConfigService,
  ) {}

  @createOneBioLink()
  @Post()
  createOne(@Body() createBioLinkDto: CreateBioLinkDto, @Req() req: any) {
    createBioLinkDto.userId = req.userId; //this is extracted from cookie in cookieMiddleware
    return this.bioLinksService.createBioLink(createBioLinkDto);
  }

  @findAllBioLinks()
  @Get()
  findAll(@Req() req: any, @Query() query: Record<string, any>) {
    ///must define req type ...i dont know how to do it
    const { page = 1 } = query; // Set defaults if not provided
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    const pageSize = this.envConfigService.getPageSize();
    return this.bioLinksService.findAllBioLink(page, pageSize, userId);
  }

  @updateOneBioLink()
  @Put('/:id')
  updateOne(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateBioLinkDto: UpdateBioLinkDto,
    @Req() req: any,
  ) {
    updateBioLinkDto.userId = req.userId; //this is extracted from cookie in cookieMiddleware

    return this.bioLinksService.updateBioLink(id, updateBioLinkDto);
  }

  @deleteOneBioLink()
  @Delete('/:id')
  deleteOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware

    return this.bioLinksService.deleteBioLink(id, userId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    return this.bioLinksService.findOneBioLink(id, userId);
  }
}
