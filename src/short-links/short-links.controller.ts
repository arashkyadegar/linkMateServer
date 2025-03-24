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
  Redirect,
  HttpStatus,
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
  create(@Body() createShortLinkDto: CreateShortLinkDto) {
    return this.shortLinksService.createShortLink(createShortLinkDto);
  }

  @Redirect()
  @Get('/shortlink/:code')
  async redirectToTarget(@Param('shortCode') shortCode: string) {
    const targetLink =
      await this.shortLinksService.findShortLinkbyShortCode(shortCode);
    if (targetLink) {
      const now = new Date();
      // Check if the link has expired
      const isExpired =
        await this.shortLinksService.checkLinkExpire(targetLink);
      if (isExpired) {
        return { statusCode: 410, message: 'This link has expired.' }; // 410: Gone
      }

      return { statusCode: HttpStatus.FOUND, targetLink };
    }

    return { statusCode: 404, message: 'Shortlink not found' };
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

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId;
    return this.shortLinksService.deleteShortLink(id, userId);
  }
}
