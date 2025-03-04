import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { CreateLinkDto } from 'src/links/create-link.dto';

export class CreateSuperLinkDto extends CreateLinkDto {
  @IsString()
  @Length(3, 10)
  subTitle: string;
}

export class UpdateSuperLinkDto extends CreateSuperLinkDto {
  @IsNumber()
  id: number;
}
