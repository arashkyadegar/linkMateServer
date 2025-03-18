import { Controller, Post, Body, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from 'src/users/user.entity';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';
import { SigninUser, SignupUser } from './custom-decorator/swagger-decorator';
import { Response } from 'express';

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
  async signin(
    @Body() signinDto: SigninDto,
    @Res() res: Response,
  ): Promise<void> {
    let response = await this.authService.signin(signinDto);

    // Set the cookie
    res.cookie('access-token', response.accessToken, {
      httpOnly: true,
      // secure: false,
      // sameSite: 'none',
    });

    response.refreshToken = '';
    response.accessToken = '';

    res.send(response);
  }
}
