import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'email of the user.must be a valid Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12aC3$dfg',
    description:
      'password of the user. regex for password to contain atleast one uppercase, lowercase, number and special character and must have atleast 8 char length',
  })
  @IsString()
  password: string;
}
