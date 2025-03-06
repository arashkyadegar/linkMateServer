import { Controller, Post, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from 'src/users/user.entity';
import { SigninDto } from './dto/signin.dto';
import { UserJwtResponse } from './user-jwt.interface';
import { ApiTags } from '@nestjs/swagger';
import { SigninUser, SignupUser } from './custom-decorator/swagger-decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SignupUser()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<UserEntity | null> {
    return this.authService.signUp(signupDto);
  }

  @SigninUser()
  @Put('signin')
  async signin(@Body() signinDto: SigninDto): Promise<UserJwtResponse> {
    return this.authService.signin(signinDto);
  }
}
