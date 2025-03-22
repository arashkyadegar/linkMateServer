import { PartialType } from '@nestjs/swagger';
import { CreateShortLinkDto } from './create-short-link.dto';
import { IsString } from 'class-validator';

export class UpdateShortLinkDto extends PartialType(CreateShortLinkDto) {
  @IsString()
  id: string;
}
