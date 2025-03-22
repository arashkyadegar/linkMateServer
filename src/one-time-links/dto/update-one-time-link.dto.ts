import { PartialType } from '@nestjs/swagger';
import { CreateOneTimeLinkDto } from './create-one-time-link.dto';

export class UpdateOneTimeLinkDto extends PartialType(CreateOneTimeLinkDto) {}
