import { Test, TestingModule } from '@nestjs/testing';
import { SuperLinksService } from './super-links.service';

describe('SuperLinksService', () => {
  let service: SuperLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperLinksService],
    }).compile();

    service = module.get<SuperLinksService>(SuperLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
