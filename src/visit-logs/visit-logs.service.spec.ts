import { Test, TestingModule } from '@nestjs/testing';
import { VisitLogsService } from './visit-logs.service';

describe('VisitLogsService', () => {
  let service: VisitLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitLogsService],
    }).compile();

    service = module.get<VisitLogsService>(VisitLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
