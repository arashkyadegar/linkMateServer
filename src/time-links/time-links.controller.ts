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
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TimeLinksService } from './time-links.service';
import { CreateTimeLinkDto } from './dto/create-time-link.dto';
import { UpdateTimeLinkDto } from './dto/update-time-link.dto';
import { EnvConfigService } from 'src/env-config/env-config.service';

@Controller()
export class TimeLinksController {
  constructor(
    private readonly timeLinksService: TimeLinksService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  @Post('/time-links')
  create(@Body() createTimeLinkDto: CreateTimeLinkDto, @Req() req: any) {
    createTimeLinkDto.userId = req.userId;
    return this.timeLinksService.create(createTimeLinkDto);
  }

  @Get('/time-links/findbyuserid')
  findAllByUserId(@Req() req: any, @Query() query: Record<string, any>) {
    const { page = 1 } = query; // Set defaults if not provided
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    const pageSize = this.envConfigService.getPageSize();
    return this.timeLinksService.findAllByUserId(page, pageSize, userId);
  }

  @Get('/time-links/:id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId;
    return this.timeLinksService.findOneTimeLink(id, userId);
  }

  @Put('/time-links/:id')
  updateOne(
    @Param('id') id: string,
    @Body() updateTimeLinkDto: UpdateTimeLinkDto,
    @Req() req: any,
  ) {
    updateTimeLinkDto.userId = req.userId;
    return this.timeLinksService.updatePasswordLink(id, updateTimeLinkDto);
  }

  @Get('/tlnk/:shortCode')
  async redirectToTarget(
    @Param('shortCode') shortCode: string,
    @Res() res: any,
  ) {
    try {
      const targetLink =
        await this.timeLinksService.findTimeLinkbyShortCode(shortCode);

      if (!targetLink) {
        // Serve the "not found" view
        return res
          .status(HttpStatus.NOT_FOUND)
          .render('not-found', { shortCode });
      }

      const now = new Date();
      const expirationDate = new Date(targetLink.expirationDate)
      // Check if the link has expired
      if (expirationDate <= now) {
        // Serve the "expired" view
        return res.status(HttpStatus.GONE).render('expired', { shortCode });
      }

      if (targetLink.isSingleUse && targetLink.isUsed) {
        // Serve the "expired" view for single-use links
        return res.status(HttpStatus.GONE).render('expired', { shortCode });
      }

      // Update visit count and mark as used if single-use
      await this.timeLinksService.patchTimeLink(targetLink._id.toString(), {
        visitCount: targetLink.visitCount + 1,
        isUsed: targetLink.isSingleUse ? true : targetLink.isUsed,
      });

      // Redirect to the original URL
      return res.redirect(targetLink.originalUrl);
    } catch (error) {
      // Serve a generic error view
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .render('error', { message: 'Something went wrong.' });
    }
  }

  @Delete('/time-links/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId;
    return this.timeLinksService.deleteTimeLink(id, userId);
  }
}
