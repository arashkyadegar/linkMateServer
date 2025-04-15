import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';
import { BaseLinkDto } from 'src/common/dtos/base-link.dto';

export class CreateTimeLinkDto extends BaseLinkDto {
  @IsDate()
  @Type(() => Date)
  expirationDate: Date;
}
