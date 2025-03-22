import { Test, TestingModule } from '@nestjs/testing';
import { PasswordLinksService } from './password-links.service';

describe('PasswordLinksService', () => {
  let service: PasswordLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordLinksService],
    }).compile();

    service = module.get<PasswordLinksService>(PasswordLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
