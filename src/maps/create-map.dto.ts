import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMapDto {
  @IsOptional()
  @IsUrl()
  neshan: string = '';

  @IsUrl()
  @IsOptional()
  balad: string = '';

  @IsOptional()
  @IsUrl()
  googleMaps: string = '';
}
