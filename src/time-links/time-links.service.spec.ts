import { Test, TestingModule } from '@nestjs/testing';
import { TimeLinksService } from './time-links.service';

describe('TimeLinksService', () => {
  let service: TimeLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeLinksService],
    }).compile();

    service = module.get<TimeLinksService>(TimeLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
