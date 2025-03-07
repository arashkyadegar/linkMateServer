import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailAlreadyExistsException } from '../users/custom-exception/EmailAlreadyExistsException';
import { HttpException } from '@nestjs/common';

describe('AuthServiceTests', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUserById', () => {
    it('should return null if service returns null', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(null);
      const result = await authService.validateUserById(1);

      await expect(result).toBeFalsy();
    });

    it('should throw ', async () => {
      const enteredUser = new UserEntity();
      enteredUser.email = 'user@gmail.com';
      enteredUser.password = '123123';

      jest.spyOn(usersService, 'create').mockImplementation(() => {
        throw new EmailAlreadyExistsException();
      });

      try {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        const x = await authService.signUp(enteredUser);

      } catch (e) {
        expect(e).toBeInstanceOf(EmailAlreadyExistsException);
      }

      await expect(authService.signUp(enteredUser)).rejects.toThrow();
    });
  });
});
