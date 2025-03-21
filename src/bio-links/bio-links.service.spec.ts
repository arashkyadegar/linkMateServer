import { Test, TestingModule } from '@nestjs/testing';
import { BioLinksService } from './bio-links.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BioLinkEntity } from './biolink.entity';
import { Repository } from 'typeorm';
import { createPaginatedResult } from 'src/common/helpers/createPaginatedResult';

describe('BioLinksService', () => {
  let bioLinksService: BioLinksService;
  let repository: Repository<BioLinkEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BioLinksService,
        {
          provide: getRepositoryToken(BioLinkEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    bioLinksService = module.get<BioLinksService>(BioLinksService);
    repository = module.get<Repository<BioLinkEntity>>(
      getRepositoryToken(BioLinkEntity),
    );
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(bioLinksService).toBeDefined();
    });
  });
});
