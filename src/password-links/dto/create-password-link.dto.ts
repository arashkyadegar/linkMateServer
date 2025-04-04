import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, Length } from 'class-validator';
import { BaseLinkDto } from 'src/common/dtos/base-link.dto';

export class CreatePasswordLinkDto extends BaseLinkDto {
  @IsString()
  @Length(8)
  passwordHash: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expirationDate: Date | null;
}
