import { Test, TestingModule } from '@nestjs/testing';
import { BioLinksController } from './bio-links.controller';
import { MapsService } from 'src/maps/maps.service';
import { BioLinksService } from './bio-links.service';

describe('BioLinksController', () => {
  let controller: BioLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BioLinksController],
      providers: [
        {
          provide: BioLinksService,
          useValue: {
            findAllBioLink: jest.fn(), // Mock the service method
          },
        },
      ],
    }).compile();

    controller = module.get<BioLinksController>(BioLinksController);
    const service = module.get<BioLinksService>(BioLinksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
