import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { UpdateShortLinkDto } from './dto/update-short-link.dto';
import { EnvConfigService } from 'src/env-config/env-config.service';

@Controller('short-links')
export class ShortLinksController {
  constructor(
    private readonly shortLinksService: ShortLinksService,
    private envConfigService: EnvConfigService,
  ) {}

  @Post()
  create(@Body() createShortLinkDto: CreateShortLinkDto, @Req() req: any) {
    const userId = req.userId || null;
    createShortLinkDto.userId = userId;
    return this.shortLinksService.createShortLink(createShortLinkDto);
  }

  // @Redirect()
  @Get('/shortlink/:shortCode')
  async redirectToTarget(
    @Param('shortCode') shortCode: string,
    @Res() res: any,
  ) {
    const targetLink =
      await this.shortLinksService.findShortLinkbyShortCode(shortCode);
    if (targetLink) {
      // const now = new Date();
      if (targetLink.isSingleUse && targetLink.isUsed) {
        return res
          .status(HttpStatus.GONE)
          .json({ message: 'This link has expired.' });
      } else {
        // we must increase visitcount each time link is visited
        await this.shortLinksService.patchShortLink(targetLink._id.toString(), {
          visitCount: targetLink.visitCount + 1,
          isUsed: targetLink.isSingleUse && !targetLink.isUsed,
        });

        return res.status(HttpStatus.FOUND).json(targetLink);
      }
    }
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: 'Shortlink not found' });
  }

  @Get('/findbyuserid')
  findAllByUserId(@Req() req: any, @Query() query: Record<string, any>) {
    const { page = 1 } = query; // Set defaults if not provided
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    const pageSize = this.envConfigService.getPageSize();
    return this.shortLinksService.findAllByUserId(page, pageSize, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId;
    return this.shortLinksService.findOneShortLink(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortLinkDto: UpdateShortLinkDto,
    @Req() req: any,
  ) {
    updateShortLinkDto.userId = req.userId;
    return this.shortLinksService.updateShortLink(id, updateShortLinkDto);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateShortLinkDto: UpdateShortLinkDto,
    @Req() req: any,
  ) {
    updateShortLinkDto.userId = req.userId;
    console.log(id)
    return this.shortLinksService.updateShortLink(id, updateShortLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    console.log('Controller req.userId:', req.userId);
    const userId = req.userId;
    return this.shortLinksService.deleteShortLink(id, userId);
  }
}
