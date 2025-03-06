import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';
import { AuthModule } from 'src/auth/auth.module';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapsService],
      imports: [AuthModule],
    }).compile();

    service = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
