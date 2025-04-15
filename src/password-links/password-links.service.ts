import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePasswordLinkDto } from './dto/create-password-link.dto';
import { UpdatePasswordLinkDto } from './dto/update-password-link.dto';
import { PasswordLinkEntity } from './entities/password-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { RandomWordsService } from 'src/random-words/random-words.service';
import * as bcrypt from 'bcrypt';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { createPaginatedResult } from 'src/common/helpers/createPaginatedResult';

@Injectable()
export class PasswordLinksService {
  constructor(
    @InjectRepository(PasswordLinkEntity)
    private passwordLinkRepository: MongoRepository<PasswordLinkEntity>,
    private readonly randomWordsService: RandomWordsService,
  ) {}

  async findOnePasswordLink(
    id: string,
    userId: string,
  ): Promise<PasswordLinkEntity> {
    if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    const secureLink = await this.passwordLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!secureLink) {
      throw new NotFoundException(`SecureLink with ID ${id} not found`);
    }

    return secureLink;
  }
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

    expirationDate = expirationDate || null;

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

  async findAllByUserId(
    page: number,
    pageSize: number,
    userId: string,
  ): Promise<PaginatedResult<any>> {
    const skipNumber = (page - 1) * pageSize;

    // Unified filter for consistency
    const filter = { userId: new ObjectId(userId) };

    // Create the aggregation pipeline
    const pipeline = [
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: skipNumber },
      { $limit: pageSize },
    ];

    try {
      // Run aggregation and count queries concurrently
      const [result, totalCount] = await Promise.all([
        this.passwordLinkRepository.aggregate(pipeline).toArray(),
        this.passwordLinkRepository.countDocuments(filter), // Replaced `count` with `countDocuments`
      ]);

      return createPaginatedResult(result, totalCount, page);
    } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching paginated data:', error);
      throw new Error('Failed to fetch paginated data');
    }
  }
  findAll() {
    return `This action returns all passwordLinks`;
  }

  async findPasswordLinkbyShortCode(
    shortCode: string,
  ): Promise<PasswordLinkEntity | null> {
    const passwordLink = await this.passwordLinkRepository.findOneBy({
      shortCode: shortCode,
    });

    return passwordLink;
  }
  async patchPasswordLink(
    id: string,
    updateFields: Partial<CreatePasswordLinkDto>,
  ): Promise<PasswordLinkEntity> {
    // Validate the ID
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    // Find the existing short link
    const passwordLink = await this.passwordLinkRepository.findOneBy({
      _id: new ObjectId(id),
    });

    if (!passwordLink) {
      throw new NotFoundException(`PasswordLink with ID ${id} not found`);
    }

    // Apply only the specified updates
    Object.assign(passwordLink, updateFields, { updatedAt: new Date() });

    // Save and return the updated short link
    return await this.passwordLinkRepository.save(passwordLink);
  }

  findOne(id: string) {
    return `This action returns a #${id} passwordLink`;
  }

  async updatePasswordLink(
    id: string,
    updatePasswordLinkDto: UpdatePasswordLinkDto,
  ) {
    let {
      userId,
      originalUrl,
      shortCode,
      visitCount,
      passwordHash,
      expirationDate,
    } = updatePasswordLinkDto;

    if (!userId) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    const passwordLink = await this.passwordLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!passwordLink) {
      throw new NotFoundException(`shortLink with ID ${id} not found`);
    }
    expirationDate = expirationDate || null;
    const salt = await bcrypt.genSalt();
    const passwordHashed = await this.hashPassword(
      passwordHash as string,
      salt,
    );

    Object.assign(passwordLink, {
      originalUrl,
      passwordHash: passwordHashed,
      shortCode,
      expirationDate,
      updatedAt: Date.now(),
    });

    return this.passwordLinkRepository.save(passwordLink);
  }

  async UnlockPasswordLink(id: string, password: string) {
    const passwordLink = await this.findPasswordLinkbyShortCode(id);

    if (!passwordLink) {
      throw new NotFoundException(`passwordLink with ID ${id} not found`);
    }

    const result = await bcrypt.compare(password, passwordLink.passwordHash);

    if (!result) {
      throw new BadRequestException(`The password you entered is incorrect. Please try again.`);
    }

    return passwordLink;
  }

  
  async deletePasswordLink(id: string, userId: string) {
    const passwordLink = await this.passwordLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!passwordLink) {
      throw new NotFoundException(`passwordLink with ID ${id} not found`);
    }

    await this.passwordLinkRepository.remove(passwordLink);
  }
}
