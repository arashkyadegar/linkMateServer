import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { UpdateShortLinkDto } from './dto/update-short-link.dto';
import { ShortLinkEntity } from './entities/short-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';
import { createPaginatedResult } from '../common/helpers/createPaginatedResult';
import { RandomWordsService } from 'src/random-words/random-words.service';

@Injectable()
export class ShortLinksService {
  constructor(
    @InjectRepository(ShortLinkEntity)
    private shortLinkRepository: MongoRepository<ShortLinkEntity>,
    private readonly randomWordsService: RandomWordsService,
  ) {}

  async createShortLink(
    createShortLinkDto: CreateShortLinkDto,
  ): Promise<ShortLinkEntity> {
    let { userId, originalUrl, shortCode, visitCount, isSingleUse, isUsed } =
      createShortLinkDto;
    const shortCodeSet = await this.findAllShortCodes();
    if (!shortCode) {
      shortCode = this.randomWordsService.generateRandomString(
        6,
        12,
        shortCodeSet,
      );
    } else {
      if (shortCodeSet.has(shortCode)) {
        throw new ConflictException(
          `A ShortLink with shortCode ${shortCode} is Existed`,
        );
      }
    }

    const shortLink = this.shortLinkRepository.create({
      ...(userId && { userId }),
      originalUrl,
      shortCode,
      visitCount,
      isSingleUse,
      isUsed,
      createdAt: Date.now(),
    });

    return this.shortLinkRepository.save(shortLink);
  }

  findAll() {
    return `This action returns all shortLinks`;
  }

  async findAllByUserId(
    page: number,
    pageSize: number,
    userId: string,
  ): Promise<PaginatedResult<any>> {
    const skipNumber = (page - 1) * pageSize;

    const pipeline = [
      { $match: { userId: new ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $skip: skipNumber },
      { $limit: pageSize },
    ];

    const [result, totalCount] = await Promise.all([
      this.shortLinkRepository.aggregate(pipeline).toArray(),
      this.shortLinkRepository.count({
        where: { userId: new ObjectId(userId) },
      }),
    ]);

    return createPaginatedResult(result, totalCount);
  }

  async findAllShortCodes(): Promise<Set<string>> {
    const shortLinks = await this.shortLinkRepository.find({
      select: ['shortCode'], // Only fetch the "shortCode" column
    });

    // Extract shortCode values and save them in a Set
    return new Set(shortLinks.map((link) => link.shortCode));
  }

  async findOneShortLink(id: string, userId: string): Promise<ShortLinkEntity> {
    if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    const shortLink = await this.shortLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!shortLink) {
      throw new NotFoundException(`BioLink with ID ${id} not found`);
    }

    return shortLink;
  }

  async updateShortLink(id: string, updateShortLinkDto: UpdateShortLinkDto) {
    const { userId, originalUrl, shortCode, visitCount } = updateShortLinkDto;

    if (!userId) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    const shortLink = await this.shortLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!shortLink) {
      throw new NotFoundException(`shortLink with ID ${id} not found`);
    }

    Object.assign(shortLink, {
      originalUrl,
      shortCode,
      visitCount,
      updatedAt: Date.now(),
    });

    return this.shortLinkRepository.save(shortLink);
  }

  async patchShortLink(
    id: string,
    updateFields: Partial<CreateShortLinkDto>,
  ): Promise<ShortLinkEntity> {
    // Validate the ID
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    // Find the existing short link
    const shortLink = await this.shortLinkRepository.findOneBy({
      _id: new ObjectId(id),
    });

    if (!shortLink) {
      throw new NotFoundException(`ShortLink with ID ${id} not found`);
    }

    // Apply only the specified updates
    Object.assign(shortLink, updateFields, { updatedAt: new Date() });

    // Save and return the updated short link
    return await this.shortLinkRepository.save(shortLink);
  }

  async deleteShortLink(id: string, userId: string) {
    const shortLink = await this.shortLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!shortLink) {
      throw new NotFoundException(`shortLink with ID ${id} not found`);
    }

    await this.shortLinkRepository.remove(shortLink);
  }

  async findShortLinkbyShortCode(
    shortCode: string,
  ): Promise<ShortLinkEntity | null> {
    const shortLink = await this.shortLinkRepository.findOneBy({
      shortCode: shortCode,
    });

    return shortLink;
  }

  // async checkLinkExpire(shortLinkentity: ShortLinkEntity): Promise<boolean> {
  //   const now = new Date();
  //   // Check if the link has expired
  //   if (
  //     shortLinkentity.expirationDate &&
  //     shortLinkentity.expirationDate < now
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }
}
