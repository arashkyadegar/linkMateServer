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
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { createPaginatedResult } from 'src/common/helpers/createPaginatedResult';

@Injectable()
export class ShortLinksService {
  constructor(
    @InjectRepository(ShortLinkEntity)
    private shortLinkRepository: MongoRepository<ShortLinkEntity>,
  ) {}
  async create(
    createShortLinkDto: CreateShortLinkDto,
  ): Promise<ShortLinkEntity> {
    let { userId, originalUrl, shortCode, visitCount, expirationDate } =
      createShortLinkDto;

    const existingShortLink = await this.findShortLinkbyShortCode(shortCode);

    if (existingShortLink) {
      throw new ConflictException(
        `A ShortLink with shortCode ${shortCode} is Existed`,
      );
    }

    const bioLink = this.shortLinkRepository.create({
      ...(userId && { userId }),
      originalUrl,
      shortCode,
      visitCount,
      expirationDate,
    });

    return this.shortLinkRepository.save(bioLink);
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

  async findOneBioLink(id: string, userId: string): Promise<ShortLinkEntity> {
    
    if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid ID or UserID format.');
    }

    const bioLink = await this.shortLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!bioLink) {
      throw new NotFoundException(`BioLink with ID ${id} not found`);
    }

    return bioLink;
  }

  update(id: number, updateShortLinkDto: UpdateShortLinkDto) {
    return `This action updates a #${id} shortLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortLink`;
  }

  async findShortLinkbyShortCode(shortCode: string): Promise<ShortLinkEntity> {
    const shortLink = await this.shortLinkRepository.findOneBy({
      shortCode: shortCode,
    });

    if (!shortLink) {
      throw new ConflictException(
        `shortLink with shortCode ${shortCode} is Existed`,
      );
    }

    return shortLink;
  }
}
