import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyExistsException } from './custom-exception/EmailAlreadyExistsException';
import { CreateUserDto } from './create-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;

    let user = new UserEntity();

    // Check if email already exists
    const existingUser = await this.userRepository.findOneBy({ email: email });

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.email = email;

    user = this.userRepository.create(user);

    const x = this.userRepository.save(user);
    console.log(x);
    return x;
  }

  async findUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOneByOrFail({ email: email });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = this.userRepository.findOneBy({
      _id: new ObjectId(id),
    });

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

  async signIn(signinDto: CreateUserDto): Promise<UserEntity | null> {
    const { email, password } = signinDto;
    const user = await this.userRepository.findOneBy({ email: email });

    if (user && (await user.validatePassword(password))) {
      const userResponse = new UserEntity();

      userResponse.email = user.email;
      userResponse._id = user._id;
      
      return userResponse;
    } else {
      return null;
    }
  }
}
