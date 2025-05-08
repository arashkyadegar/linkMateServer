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
import { VisitLogsService } from 'src/visit-logs/visit-logs.service';

// @Controller('short-links')
@Controller()
export class ShortLinksController {
  constructor(
    private readonly shortLinksService: ShortLinksService,
    private readonly visitLogsService: VisitLogsService,
    private envConfigService: EnvConfigService,
  ) { }

  @Post('/short-links')
  create(@Body() createShortLinkDto: CreateShortLinkDto, @Req() req: any) {
    const userId = req.userId || null;
    createShortLinkDto.userId = userId;

    return this.shortLinksService.createShortLink(createShortLinkDto);
  }

  //front
  // @Redirect()
  // @Get('/shortlink/:shortCode')
  // async redirectToTarget(
  //   @Param('shortCode') shortCode: string,
  //   @Res() res: any,
  // ) {
  //   const targetLink =
  //     await this.shortLinksService.findShortLinkbyShortCode(shortCode);
  //   if (targetLink) {
  //     // const now = new Date();
  //     if (targetLink.isSingleUse && targetLink.isUsed) {
  //       return res
  //         .status(HttpStatus.GONE)
  //         .json({ message: 'This link has expired.' });
  //     } else {
  //       // we must increase visitcount each time link is visited
  //       await this.shortLinksService.patchShortLink(targetLink._id.toString(), {
  //         visitCount: targetLink.visitCount + 1,
  //         isUsed: targetLink.isSingleUse && !targetLink.isUsed,
  //       });

  //       return res.status(HttpStatus.FOUND).json(targetLink);
  //     }
  //   }
  //   return res
  //     .status(HttpStatus.NOT_FOUND)
  //     .json({ message: 'Shortlink not found' });
  // }

  //server
  @Get('/lnk/:shortCode')
  async redirectToTarget(
    @Param('shortCode') shortCode: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      const targetLink =
        await this.shortLinksService.findShortLinkbyShortCode(shortCode);

      if (!targetLink) {
        // Render "not found" view
        return res
          .status(HttpStatus.NOT_FOUND)
          .render('not-found', { shortCode });
      }

      if (targetLink.isSingleUse && targetLink.isUsed) {
        // Render "expired" view
        return res.status(HttpStatus.GONE).render('expired', { shortCode });
      }

      const ip = '5.126.144.211';

      await this.visitLogsService.create(targetLink._id,ip);

      // Update link stats
      await this.shortLinksService.patchShortLink(targetLink._id.toString(), {
        visitCount: targetLink.visitCount + 1,
        isUsed: targetLink.isSingleUse ? true : targetLink.isUsed,
      });

      // Redirect to the original URL
      console.log(`Redirecting to: ${targetLink.originalUrl}`);

      return res.redirect(targetLink.originalUrl);
    } catch (error) {
      // Render generic error view
      console.log(error)
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .render('error', { message: 'An unexpected error occurred.' });
    }
  }
  @Get('/short-links/findbyuserid')
  findAllByUserId(@Req() req: any, @Query() query: Record<string, any>) {
    const { page = 1 } = query; // Set defaults if not provided
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    const pageSize = this.envConfigService.getPageSize();
    return this.shortLinksService.findAllByUserId(page, pageSize, userId);
  }

  @Get('/short-links/:id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId;
    return this.shortLinksService.findOneShortLink(id, userId);
  }

  @Patch('/short-links/:id')
  update(
    @Param('id') id: string,
    @Body() updateShortLinkDto: UpdateShortLinkDto,
    @Req() req: any,
  ) {
    updateShortLinkDto.userId = req.userId;
    return this.shortLinksService.updateShortLink(id, updateShortLinkDto);
  }

  @Put('/short-links/:id')
  updateOne(
    @Param('id') id: string,
    @Body() updateShortLinkDto: UpdateShortLinkDto,
    @Req() req: any,
  ) {
    updateShortLinkDto.userId = req.userId;
    console.log(id);
    return this.shortLinksService.updateShortLink(id, updateShortLinkDto);
  }

  @Delete('/short-links/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    console.log('Controller req.userId:', req.userId);
    const userId = req.userId;
    return this.shortLinksService.deleteShortLink(id, userId);
  }
}
