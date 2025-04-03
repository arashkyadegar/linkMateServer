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
} from '@nestjs/common';
import { PasswordLinksService } from './password-links.service';
import { CreatePasswordLinkDto } from './dto/create-password-link.dto';
import { UpdatePasswordLinkDto } from './dto/update-password-link.dto';
import { EnvConfigService } from 'src/env-config/env-config.service';

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
  remove(@Param('id') id: string) {
    return this.passwordLinksService.remove(+id);
  }
}
