import { IsNotEmpty, IsString } from 'class-validator';

export class UnlockPasswordLinkDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  shortCode: string;
}
