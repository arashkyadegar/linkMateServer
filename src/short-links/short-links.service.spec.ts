import { Test, TestingModule } from '@nestjs/testing';
import { ShortLinksService } from './short-links.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShortLinkEntity } from './entities/short-link.entity';
import { Repository } from 'typeorm';
jest.mock('../common/helpers/createPaginatedResult.ts');

describe('ShortLinksService', () => {
  let service: ShortLinksService;

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
  });

  it('should be defined', () => {
    const createPaginatedResult = jest.fn();
    expect(service).toBeDefined();
  });
});
