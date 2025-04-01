import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PasswordLinksService } from './password-links.service';
import { CreatePasswordLinkDto } from './dto/create-password-link.dto';
import { UpdatePasswordLinkDto } from './dto/update-password-link.dto';
import { ObjectId } from 'mongodb';
@Controller('password-links')
export class PasswordLinksController {
  constructor(private readonly passwordLinksService: PasswordLinksService) {}

  @Post()
  create(
    @Body() createPasswordLinkDto: CreatePasswordLinkDto,
    @Req() req: any,
  ) {
    createPasswordLinkDto.userId = new ObjectId('67db2c7020c61303e3dfbcab'); //this is extracted from cookie in cookieMiddleware
    return this.passwordLinksService.create(createPasswordLinkDto);
  }

  @Get()
  findAll() {
    return this.passwordLinksService.findAll();
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
