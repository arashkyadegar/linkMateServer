import { Test, TestingModule } from '@nestjs/testing';
import { BioLinksService } from './bio-links.service';

describe('BioLinksService', () => {
  let service: BioLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BioLinksService],
    }).compile();

    service = module.get<BioLinksService>(BioLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
