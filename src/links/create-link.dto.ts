import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @Length(3, 10)
  @IsNotEmpty() // This makes the title field required
  title: string;

  @IsNotEmpty() // This makes the title field required
  @IsUrl()
  link: string;
}

export class UpdateLinkDto extends CreateLinkDto {
  @IsNumber()
  id: number;
}
