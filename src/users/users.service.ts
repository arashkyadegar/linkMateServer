import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { EmailAlreadyExistsException } from './custom-exception/EmailAlreadyExistsException';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: SignupDto): Promise<UserEntity> {
    const { email, password } = createUserDto;

    let user = new UserEntity();

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.email = email;

    user = this.userRepository.create(user);

    return this.userRepository.save(user);
  }

  async findUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOneByOrFail({ email: email });
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = this.userRepository.findOneBy({ id: id });
    if (!user) {
      return null;
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async signIn(signinDto: SigninDto): Promise<LoginResponseDto | null> {
    const { email, password } = signinDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await user.validatePassword(password))) {
      const userResponse = new LoginResponseDto();

      userResponse.email = user.email;

      return userResponse;
    } else {
      return null;
    }
  }
}
