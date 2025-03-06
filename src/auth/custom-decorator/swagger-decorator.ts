import {
  applyDecorators,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { SignupDto } from '../dto/signup.dto';
export function SignupUser() {
  return applyDecorators(
    ApiBody({
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
    }),

    ApiResponse({
      type: ApiOkResponse,
      status: HttpStatus.OK,
      description: 'user got registered successfully',
      example: { email: 'admin@gmail.com', password: '123we$%6' },
    }),

    ApiBadRequestResponse({
      type: BadRequestException,
      description: 'entered email is already taken',
      example: { email: 'admin@gmail.com', password: '123we$%6' },
    }),

    ApiOperation({ summary: 'user sign up' }),
  );
}

export function SigninUser() {
  return applyDecorators(
    ApiBody({
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
    }),

    ApiResponse({
      type: ApiOkResponse,
      status: HttpStatus.OK,
      description: 'user got signed in successfully',
      example: { email: 'admin@gmail.com', password: '123we$%6' },
    }),

    ApiBadRequestResponse({
      type: UnauthorizedException,
      description: 'entered email or password is wrong',
      example: { email: 'admin@gmail.com', password: '123we$%6' },
    }),
    
    ApiOperation({ summary: 'user sign in api' }),
  );
}
