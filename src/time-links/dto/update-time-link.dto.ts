import { PartialType } from '@nestjs/swagger';
import { CreateTimeLinkDto } from './create-time-link.dto';

export class UpdateTimeLinkDto extends PartialType(CreateTimeLinkDto) {}
