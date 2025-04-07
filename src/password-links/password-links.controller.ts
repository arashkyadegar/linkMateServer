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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PasswordLinksService } from './password-links.service';
import { CreatePasswordLinkDto } from './dto/create-password-link.dto';
import { UpdatePasswordLinkDto } from './dto/update-password-link.dto';
import { EnvConfigService } from 'src/env-config/env-config.service';
import { UnlockPasswordLinkDto } from './dto/unlock-password-link.dto';

@Controller('password-links')
export class PasswordLinksController {
  constructor(
    private readonly passwordLinksService: PasswordLinksService,
    private envConfigService: EnvConfigService,
  ) {}

  @Post()
  create(
    @Body() createPasswordLinkDto: CreatePasswordLinkDto,
    @Req() req: any,
  ) {
    createPasswordLinkDto.userId = req.userId;
    return this.passwordLinksService.create(createPasswordLinkDto);
  }

  @Get()
  findAll() {
    return this.passwordLinksService.findAll();
  }
  @Get('/findbyuserid')
  findAllByUserId(@Req() req: any, @Query() query: Record<string, any>) {
    const { page = 1 } = query; // Set defaults if not provided
    const userId = req.userId; //this is extracted from cookie in cookieMiddleware
    const pageSize = this.envConfigService.getPageSize();
    return this.passwordLinksService.findAllByUserId(page, pageSize, userId);
  }

  @Get('/unlock')
  unlockPasswordLink(
    @Body() unlockPasswordLinkDto: UnlockPasswordLinkDto,
    @Req() req: any,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordLinksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordLinkDto: UpdatePasswordLinkDto,
  ) {
    return this.passwordLinksService.update(+id, updatePasswordLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.userId;
    return this.passwordLinksService.deletePasswordLink(id, userId);
  }

  // @Redirect()
  // @Get('/passwordlink/:shortCode')
  // async redirectToTarget(
  //   @Param('shortCode') shortCode: string,
  //   @Res() res: any,
  // ) {
  //   const targetLink =
  //     await this.passwordLinksService.findPasswordLinkbyShortCode(shortCode);
  //   if (targetLink) {
  //     const now = new Date();

  //     // Check if the link has expired
  //     if (targetLink.expirationDate && targetLink.expirationDate <= now) {
  //       return res
  //         .status(HttpStatus.GONE)
  //         .json({ message: 'This link has expired.' });
  //     }
  //     if (targetLink.isSingleUse && targetLink.isUsed) {
  //       return res
  //         .status(HttpStatus.GONE)
  //         .json({ message: 'This link has expired.' });
  //     } else {
  //       // we must increase visitcount each time link is visited
  //       await this.passwordLinksService.patchPasswordLink(
  //         targetLink._id.toString(),
  //         {
  //           visitCount: targetLink.visitCount + 1,
  //           isUsed: targetLink.isSingleUse && !targetLink.isUsed,
  //         },
  //       );

  //       return res.status(HttpStatus.FOUND).json(targetLink);
  //     }
  //   }
  //   return res
  //     .status(HttpStatus.NOT_FOUND)
  //     .json({ message: 'Shortlink not found' });
  // }

  @Get('/passwordlink/:shortCode')
  async redirectToTarget(
    @Param('shortCode') shortCode: string,
    @Res() res: any,
  ) {
    try {
      const targetLink =
        await this.passwordLinksService.findPasswordLinkbyShortCode(shortCode);

      if (!targetLink) {
        // Serve the "not found" view
        return res
          .status(HttpStatus.NOT_FOUND)
          .render('not-found', { shortCode });
      }

      const now = new Date();

      // Check if the link has expired
      if (targetLink.expirationDate && targetLink.expirationDate <= now) {
        // Serve the "expired" view
        return res.status(HttpStatus.GONE).render('expired', { shortCode });
      }

      if (targetLink.isSingleUse && targetLink.isUsed) {
        // Serve the "expired" view for single-use links
        return res.status(HttpStatus.GONE).render('expired', { shortCode });
      }

      if (targetLink.passwordHash) {
        // Serve the "password entry" view if the link is password protected
        return res
          .status(HttpStatus.OK)
          .render('password', { shortCode, error: null });
      }

      // Update visit count and mark as used if single-use
      await this.passwordLinksService.patchPasswordLink(
        targetLink._id.toString(),
        {
          visitCount: targetLink.visitCount + 1,
          isUsed: targetLink.isSingleUse ? true : targetLink.isUsed,
        },
      );

      // Redirect to the original URL
      return res.redirect(targetLink.originalUrl);
    } catch (error) {
      // Serve a generic error view
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .render('error', { message: 'Something went wrong.' });
    }
  }
}
