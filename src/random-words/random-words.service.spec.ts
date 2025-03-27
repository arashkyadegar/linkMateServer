import { Test, TestingModule } from '@nestjs/testing';
import { RandomWordsService } from './random-words.service';

describe('RandomWordsService', () => {
  let service: RandomWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomWordsService],
    }).compile();

    service = module.get<RandomWordsService>(RandomWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
