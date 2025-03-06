import { Test, TestingModule } from '@nestjs/testing';
import { BioLinksController } from './bio-links.controller';
import { MapsService } from 'src/maps/maps.service';

describe('BioLinksController', () => {
  let controller: BioLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BioLinksController],
      providers:[MapsService]
    }).compile();

    controller = module.get<BioLinksController>(BioLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
