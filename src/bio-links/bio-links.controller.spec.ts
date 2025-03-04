import { Test, TestingModule } from '@nestjs/testing';
import { BioLinksController } from './bio-links.controller';

describe('BioLinksController', () => {
  let controller: BioLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BioLinksController],
    }).compile();

    controller = module.get<BioLinksController>(BioLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
