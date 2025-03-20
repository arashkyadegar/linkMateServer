import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @Length(3, 20)
  family: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}
