import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @Length(3, 10)
  @IsNotEmpty()
  title: string;

  @IsString()
  link: string;

  @IsNumber()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  alt: string;
}

export class UpdateImageDto extends CreateImageDto {
  @IsNumber()
  id: number;
}
