import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTimeLinkDto } from './dto/create-time-link.dto';
import { UpdateTimeLinkDto } from './dto/update-time-link.dto';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { RandomWordsService } from 'src/random-words/random-words.service';
import { TimeLinkEntity } from './entities/time-link.entity';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { createPaginatedResult } from 'src/common/helpers/createPaginatedResult';

@Injectable()
export class TimeLinksService {
  constructor(
    @InjectRepository(TimeLinkEntity)
    private timeLinkRepository: MongoRepository<TimeLinkEntity>,
    private readonly randomWordsService: RandomWordsService,
  ) {}
  async create(createTimeLinkDto: CreateTimeLinkDto) {
    let {
      originalUrl,
      shortCode,
      isSingleUse = false, // Default value
      isUsed = false,
      userId,
      expirationDate,
    } = createTimeLinkDto;

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
          `A TimeLink with shortCode ${shortCode} is Existed`,
        );
      }
    }

    // Convert userId to ObjectId if it exists
    const objectUserId = userId ? new ObjectId(userId) : null;

    const timeLink = this.timeLinkRepository.create({
      userId: objectUserId,
      originalUrl,
      shortCode,
      visitCount: 0,
      isSingleUse,
      isUsed,
      expirationDate,
      createdAt: Date.now(),
    });

    return this.timeLinkRepository.save(timeLink);
  }
  async findOneTimeLink(id: string, userId: string): Promise<TimeLinkEntity> {
    if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    const timeLink = await this.timeLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!timeLink) {
      throw new NotFoundException(`TimeLink with ID ${id} not found`);
    }

    return timeLink;
  }

  async findAllShortCodes(): Promise<Set<string>> {
    const timeLinks = await this.timeLinkRepository.find({
      select: ['shortCode'], // Only fetch the "shortCode" column
    });

    // Extract shortCode values and save them in a Set
    return new Set(timeLinks.map((link) => link.shortCode));
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
        this.timeLinkRepository.aggregate(pipeline).toArray(),
        this.timeLinkRepository.countDocuments(filter), // Replaced `count` with `countDocuments`
      ]);

      return createPaginatedResult(result, totalCount, page);
    } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching paginated data:', error);
      throw new Error('Failed to fetch paginated data');
    }
  }

  async findTimeLinkbyShortCode(
    shortCode: string,
  ): Promise<TimeLinkEntity | null> {
    const timeLink = await this.timeLinkRepository.findOneBy({
      shortCode: shortCode,
    });

    return timeLink;
  }

  async patchTimeLink(
    id: string,
    updateFields: Partial<CreateTimeLinkDto>,
  ): Promise<TimeLinkEntity> {
    // Validate the ID
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    // Find the existing short link
    const timeLink = await this.timeLinkRepository.findOneBy({
      _id: new ObjectId(id),
    });

    if (!timeLink) {
      throw new NotFoundException(`TimeLink with ID ${id} not found`);
    }

    // Apply only the specified updates
    Object.assign(timeLink, updateFields, { updatedAt: new Date() });

    // Save and return the updated short link
    return await this.timeLinkRepository.save(timeLink);
  }

  async updatePasswordLink(id: string, updateTimeLinkDto: UpdateTimeLinkDto) {
    let { userId, originalUrl, shortCode, visitCount, expirationDate } =
      updateTimeLinkDto;

    if (!userId) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    const timeLink = await this.timeLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!timeLink) {
      throw new NotFoundException(`shortLink with ID ${id} not found`);
    }

    Object.assign(timeLink, {
      originalUrl,
      shortCode,
      expirationDate,
      updatedAt: Date.now(),
    });

    return this.timeLinkRepository.save(timeLink);
  }

  remove(id: number) {
    return `This action removes a #${id} timeLink`;
  }

  async deleteTimeLink(id: string, userId: string) {
    const timeLink = await this.timeLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!timeLink) {
      throw new NotFoundException(`passwordLink with ID ${id} not found`);
    }

    await this.timeLinkRepository.remove(timeLink);
  }
}
