import { Test, TestingModule } from '@nestjs/testing';
import { OneTimeLinksController } from './one-time-links.controller';
import { OneTimeLinksService } from './one-time-links.service';

describe('OneTimeLinksController', () => {
  let controller: OneTimeLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OneTimeLinksController],
      providers: [OneTimeLinksService],
    }).compile();

    controller = module.get<OneTimeLinksController>(OneTimeLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
