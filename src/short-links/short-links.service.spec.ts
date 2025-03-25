import { Test, TestingModule } from '@nestjs/testing';
import { ShortLinksService } from './short-links.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShortLinkEntity } from './entities/short-link.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { BSONError } from 'typeorm/driver/mongodb/bson.typings';
jest.mock('../common/helpers/createPaginatedResult.ts');

describe('ShortLinksService', () => {
  let service: ShortLinksService;
  let repository: Repository<ShortLinkEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortLinksService,
        {
          provide: getRepositoryToken(ShortLinkEntity),
          useClass: Repository,
        },
      ],
    }).compile();
    jest.unmock('../common/helpers/createPaginatedResult.ts');
    service = module.get<ShortLinksService>(ShortLinksService);
    repository = module.get<Repository<ShortLinkEntity>>(
      getRepositoryToken(ShortLinkEntity),
    );
  });
  describe('createShortLink', () => {
    it('should be throw ConflictException if shortCode already existed', async () => {
      const existedShortLink = new ShortLinkEntity();
      existedShortLink.shortCode = 'user@gmail.com';
      existedShortLink.originalUrl = '123123';

      jest
        .spyOn(service, 'findShortLinkbyShortCode')
        .mockResolvedValue(existedShortLink);
      const createPaginatedResult = jest.fn();

      try {
        const x = await service.createShortLink(existedShortLink);
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }

      await expect(service.createShortLink(existedShortLink)).rejects.toThrow();
    });
  });

  describe('findAllByUserId', () => {
    it('should be throw if userId is not valid BSON ObjectId', async () => {
      const existedShortLink = new ShortLinkEntity();
      existedShortLink.shortCode = 'user@gmail.com';
      existedShortLink.originalUrl = '123123';
      const page = 1;
      const pageSize = 10;
      const userId = '1';
      jest
        .spyOn(service, 'findShortLinkbyShortCode')
        .mockResolvedValue(existedShortLink);
      const createPaginatedResult = jest.fn();

      await expect(
        service.findAllByUserId(page, page, userId),
      ).rejects.toThrow();
    });
  });
});
