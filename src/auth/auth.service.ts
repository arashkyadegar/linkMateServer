import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from 'src/users/user.entity';
import { SigninDto } from './dto/signin.dto';
import { UserJwtResponse } from './user-jwt.interface';

import { EmailAlreadyExistsException } from 'src/users/custom-exception/EmailAlreadyExistsException';
import { CreateUserDto } from 'src/users/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserById(userId: number) {
    return await this.userService.findById(userId);
  }

  async signUp(signupDto: SignupDto): Promise<UserEntity | null> {
    try {

      return this.userService.create(signupDto as CreateUserDto);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async signin(signinDto: SigninDto): Promise<UserJwtResponse> {
    const userResult = await this.userService.signIn(signinDto as CreateUserDto);

    if (!userResult) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const payload = { userResult };
    const accessToken = await this.jwtService.sign(payload);

    const signInResponse: UserJwtResponse = { user: userResult, accessToken };

    return signInResponse;
  }
}
