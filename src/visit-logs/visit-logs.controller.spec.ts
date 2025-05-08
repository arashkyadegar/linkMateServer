import { Test, TestingModule } from '@nestjs/testing';
import { VisitLogsController } from './visit-logs.controller';
import { VisitLogsService } from './visit-logs.service';

describe('VisitLogsController', () => {
  let controller: VisitLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitLogsController],
      providers: [VisitLogsService],
    }).compile();

    controller = module.get<VisitLogsController>(VisitLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
