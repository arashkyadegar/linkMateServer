import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { CreateImageDto } from 'src/images/create-image.dto';
import { CreateLinkDto } from 'src/links/create-link.dto';
import { CreateMapDto } from 'src/maps/create-map.dto';
import { CreateSuperLinkDto } from 'src/super-links/create-superlink.dto';

export class CreateBioLinkDto {
  @IsString()
  @Length(3, 10)
  name: string;

  maps: CreateMapDto | undefined;

  @IsNumber()
  userId: string = '';

  @IsString()
  @Length(3, 50)
  link: string = '';

  @IsUrl()
  video: string = '';

  @Length(3, 50)
  @IsString()
  title: string = '';

  @Length(10, 400)
  desc: string = '';

  links: CreateLinkDto[];

  superLinks: CreateSuperLinkDto[];

  slider: CreateImageDto[];

  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export class UpdateBioLinkDto extends CreateBioLinkDto {
  @IsString()
  id: string;
}
