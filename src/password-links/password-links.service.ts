import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePasswordLinkDto } from './dto/create-password-link.dto';
import { UpdatePasswordLinkDto } from './dto/update-password-link.dto';
import { PasswordLinkEntity } from './entities/password-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { RandomWordsService } from 'src/random-words/random-words.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordLinksService {
  constructor(
    @InjectRepository(PasswordLinkEntity)
    private passwordLinkRepository: MongoRepository<PasswordLinkEntity>,
    private readonly randomWordsService: RandomWordsService,
  ) {}

  async create(createPasswordLinkDto: CreatePasswordLinkDto) {
    let {
      originalUrl,
      shortCode,
      passwordHash,
      isSingleUse = false, // Default value
      isUsed = false,  
      userId,
      expirationDate,
    } = createPasswordLinkDto;

    const shortCodeSet = await this.findAllShortCodes();

    if (!shortCode?.trim()) {
      shortCode = this.randomWordsService.generateRandomString(
        6,
        12,
        shortCodeSet,
      );
    } else {
      if (shortCodeSet.has(shortCode)) {
        throw new ConflictException(
          `A PasswordLink with shortCode ${shortCode} is Existed`,
        );
      }
    }

    // Convert userId to ObjectId if it exists
    const objectUserId = userId ? new ObjectId(userId) : null;
    const salt = await bcrypt.genSalt();
    const passwordHashed = await this.hashPassword(passwordHash, salt);

    const passwordLink = this.passwordLinkRepository.create({
      userId: objectUserId,
      passwordHash: passwordHashed,
      originalUrl,
      shortCode,
      visitCount: 0,
      isSingleUse,
      isUsed,
      expirationDate,
      createdAt: Date.now(),
    });

    return this.passwordLinkRepository.save(passwordLink);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findAllShortCodes(): Promise<Set<string>> {
    const passwordLinks = await this.passwordLinkRepository.find({
      select: ['shortCode'], // Only fetch the "shortCode" column
    });

    // Extract shortCode values and save them in a Set
    return new Set(passwordLinks.map((link) => link.shortCode));
  }
  findAll() {
    return `This action returns all passwordLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordLink`;
  }

  update(id: number, updatePasswordLinkDto: UpdatePasswordLinkDto) {
    return `This action updates a #${id} passwordLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordLink`;
  }
}
