import { Test, TestingModule } from '@nestjs/testing';
import { PasswordLinksController } from './password-links.controller';
import { PasswordLinksService } from './password-links.service';

describe('PasswordLinksController', () => {
  let controller: PasswordLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordLinksController],
      providers: [PasswordLinksService],
    }).compile();

    controller = module.get<PasswordLinksController>(PasswordLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
