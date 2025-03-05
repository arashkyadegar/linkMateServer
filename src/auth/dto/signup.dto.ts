import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'email of the user.must be a valid Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12aC3$dfg', description: 'password of the user. regex for password to contain atleast one uppercase, lowercase, number and special character and must have atleast 8 char length' })
  @IsString()
  @MinLength(8)
  //regex for password to contain atleast one uppercase, lowercase, number and special character
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain uppercase, lowercase, number and special character',
  })
  password: string;
}
