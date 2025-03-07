import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmailAlreadyExistsException } from './custom-exception/EmailAlreadyExistsException';

describe('UsersServiceTests', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('create', () => {
    it('should throw EmailAlreadyExistsException if email is already taken', async () => {
      const enteredUser = new UserEntity();
      enteredUser.email = 'user@gmail.com';
      enteredUser.password = '123123';

      jest.spyOn(repository, 'findOne').mockResolvedValue(enteredUser);

      try {
        await service.create(enteredUser);
      } catch (e) {
        expect(e).toBeInstanceOf(EmailAlreadyExistsException);
      }

      await expect(service.create(enteredUser)).rejects.toThrow();
    });

    it('should successfully create a user if email is not taken', async () => {
      const newUser = new UserEntity();
      newUser.email = 'newuser@gmail.com';
      newUser.password = 'password123';
      newUser.salt = '';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(newUser);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser);

      const result = await service.create(newUser);

      expect(result).toEqual(newUser);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'newuser@gmail.com' },
      });

      expect(result).toHaveProperty('salt');
    });
  });

  describe('signin', () => {
    it('should fails if username is not found', async () => {
      const enteredUser = new UserEntity();
      enteredUser.email = 'user@gmail.com';
      enteredUser.password = '123123';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.signIn(enteredUser);

      expect(result).toBeFalsy();
    });

    it('should fails if password not corrected', async () => {
      const enteredUser = new UserEntity();
      enteredUser.email = 'user@gmail.com';
      enteredUser.password = '123123';
      jest.spyOn(enteredUser, 'validatePassword').mockResolvedValue(false);
      jest.spyOn(repository, 'findOne').mockResolvedValue(enteredUser);

      const result = await service.signIn(enteredUser);

      expect(result).toBeFalsy(); //.toBeNull
    });

    it('should successed if password is correct', async () => {
      const enteredUser = new UserEntity();
      enteredUser.email = 'user@gmail.com';
      enteredUser.password = '123123';
      jest.spyOn(enteredUser, 'validatePassword').mockResolvedValue(true);
      jest.spyOn(repository, 'findOne').mockResolvedValue(enteredUser);

      const result = await service.signIn(enteredUser);

      expect(result).toBeTruthy();
    });
  });
});
