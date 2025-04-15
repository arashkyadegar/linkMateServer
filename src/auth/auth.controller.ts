import { Controller, Post, Body, Put, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';
import { SigninUser, SignupUser } from './custom-decorator/swagger-decorator';
import { Response } from 'express';
import { EmailAlreadyExistsException } from 'src/users/custom-exception/EmailAlreadyExistsException';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SignupUser()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res() res: any): Promise<void> {
    try {
      const response = await this.authService.signUp(signupDto);
      response?._id;
      response?.email;
      return res
        .status(HttpStatus.CREATED)
        .send({ _id: response?._id, email: response?.email });
    } catch (exception: any) {
      if (exception instanceof EmailAlreadyExistsException) {
        return res.status(HttpStatus.CONFLICT).send(signupDto);
      }
    }
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
