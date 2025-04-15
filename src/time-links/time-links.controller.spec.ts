import { Test, TestingModule } from '@nestjs/testing';
import { TimeLinksController } from './time-links.controller';
import { TimeLinksService } from './time-links.service';

describe('TimeLinksController', () => {
  let controller: TimeLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeLinksController],
      providers: [TimeLinksService],
    }).compile();

    controller = module.get<TimeLinksController>(TimeLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
