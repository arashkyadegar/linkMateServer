import { Type } from 'class-transformer';
import { IsDate, IsString, Length } from 'class-validator';
import { BaseLinkDto } from 'src/common/dtos/base-link.dto';

export class CreatePasswordLinkDto extends BaseLinkDto {
  @IsString()
  @Length(8)
  passwordHash: string;

  @IsDate()
  @Type(() => Date)
  expirationDate: Date;
}
