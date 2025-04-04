import { IsNotEmpty, IsString } from 'class-validator';

export class UnlockPasswordLinkDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
