import { Module } from '@nestjs/common';
import { PasswordLinksService } from './password-links.service';
import { PasswordLinksController } from './password-links.controller';

@Module({
  controllers: [PasswordLinksController],
  providers: [PasswordLinksService],
})
export class PasswordLinksModule {}
