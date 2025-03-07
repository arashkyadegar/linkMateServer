import { Test, TestingModule } from '@nestjs/testing';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';
import { Repository } from 'typeorm';
import { MapEntity } from './map.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MapsController', () => {
  let controller: MapsController;
  let service: MapsService;
  let repository: Repository<MapEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MapsController],
      providers: [
        MapsService,
        {
          provide: getRepositoryToken(MapEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get(MapsService);
    controller = moduleRef.get(MapsController);
    repository = moduleRef.get<Repository<MapEntity>>(
      getRepositoryToken(MapEntity),
    );
  });
  describe('findAll', () => {
    it('should return array of maps', async () => {
      const result: MapEntity[] = [];
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const maps = await service.findAll();
      expect(maps).toBeDefined();
      expect(maps).toEqual(result);
    });
  });


});
