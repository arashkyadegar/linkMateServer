import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasswordLinksService } from './password-links.service';
import { CreatePasswordLinkDto } from './dto/create-password-link.dto';
import { UpdatePasswordLinkDto } from './dto/update-password-link.dto';

@Controller('password-links')
export class PasswordLinksController {
  constructor(private readonly passwordLinksService: PasswordLinksService) {}

  @Post()
  create(@Body() createPasswordLinkDto: CreatePasswordLinkDto) {
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
  update(@Param('id') id: string, @Body() updatePasswordLinkDto: UpdatePasswordLinkDto) {
    return this.passwordLinksService.update(+id, updatePasswordLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordLinksService.remove(+id);
  }
}
