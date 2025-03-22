import { Test, TestingModule } from '@nestjs/testing';
import { BioLinksController } from './bio-links.controller';
import { MapsService } from 'src/maps/maps.service';
import { BioLinksService } from './bio-links.service';
import { EnvConfigService } from 'src/env-config/env-config.service';
import { BioLinkEntity } from './biolink.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
describe('BioLinksController', () => {
  let controller: BioLinksController;
  let bioLinksService: BioLinksService;
  let envConfigService: EnvConfigService;
  const mockBioLinksService = {
    createBioLink: jest.fn(),
    findAllBioLink: jest.fn(),
    updateBioLink: jest.fn(),
    deleteBioLink: jest.fn(),
    findOneBioLink: jest.fn(),
  };

  const mockEnvConfigService = {
    getPageSize: jest.fn().mockReturnValue(10), // Example default return value
  };

  jest.mock('src/links/create-link.dto', () => ({
    CreateLinkDto: jest.fn(),
  }));

  jest.mock('src/images/create-image.dto', () => {
    return { CreateImageDto: jest.fn() };
  });
  jest.mock('./create-biolink.dto', () => ({
    CreateBioLinkDto: jest.fn(),
    UpdateBioLinkDto: jest.fn(),
  }));




  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BioLinksController],
      providers: [
        { provide: BioLinksService, useValue: mockBioLinksService },
        { provide: EnvConfigService, useValue: mockEnvConfigService },
      ],
    }).compile();

    controller = module.get<BioLinksController>(BioLinksController);
    bioLinksService = module.get<BioLinksService>(BioLinksService);
    envConfigService = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
