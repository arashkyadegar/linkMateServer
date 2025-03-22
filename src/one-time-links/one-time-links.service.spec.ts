import { Test, TestingModule } from '@nestjs/testing';
import { OneTimeLinksService } from './one-time-links.service';

describe('OneTimeLinksService', () => {
  let service: OneTimeLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OneTimeLinksService],
    }).compile();

    service = module.get<OneTimeLinksService>(OneTimeLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
