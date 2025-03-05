import {
  Controller,
  Post,
  Body,
  Put,
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from 'src/users/user.entity';
import { SigninDto } from './dto/signin.dto';
import { UserJwtResponse } from './user-jwt.interface';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description: 'The user use this api to signup',
    type: SignupDto,
    examples: {
      a: {
        summary: 'Example A',
        value: { email: 'user1@gmail.com', password: 'password1' },
      },
      b: {
        summary: 'Example B',
        value: { email: 'user2@gmail.com', password: 'password2' },
      },
    },
  })

  @ApiResponse({
    type: ApiOkResponse,
    status: HttpStatus.OK,
    description: 'user got registered successfully',
    example:{email:'admin@gmail.com',password:'123we$%6'}
  })

  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'entered email is already taken',
    example:{email:'admin@gmail.com',password:'123we$%6'}
  })

  @ApiOperation({ summary: 'user sign up' })

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<UserEntity | null> {
    return this.authService.signUp(signupDto);
  }

  @ApiBody({
    description: 'The user use this api to signin',
    type: SignupDto,
    examples: {
      a: {
        summary: 'Example A',
        value: { email: 'user1@gmail.com', password: 'password1' },
      },
      b: {
        summary: 'Example B',
        value: { email: 'user2@gmail.com', password: 'password2' },
      },
    },
  })

  @ApiResponse({
    type: ApiOkResponse,
    status: HttpStatus.OK,
    description: 'user got signed in successfully',
    example:{email:'admin@gmail.com',password:'123we$%6'}
  })

  @ApiBadRequestResponse({
    type: UnauthorizedException,
    description: 'entered email or password is wrong',
    example:{email:'admin@gmail.com',password:'123we$%6'}
  })

  @ApiOperation({ summary: 'user sign in api' })
  @Put('signin')
  async signin(@Body() signinDto: SigninDto): Promise<UserJwtResponse> {
    return this.authService.signin(signinDto);
  }
}
