import { PartialType } from '@nestjs/swagger';
import { CreatePasswordLinkDto } from './create-password-link.dto';

export class UpdatePasswordLinkDto extends PartialType(CreatePasswordLinkDto) {}
