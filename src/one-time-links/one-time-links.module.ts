import { Module } from '@nestjs/common';
import { OneTimeLinksService } from './one-time-links.service';
import { OneTimeLinksController } from './one-time-links.controller';

@Module({
  controllers: [OneTimeLinksController],
  providers: [OneTimeLinksService],
})
export class OneTimeLinksModule {}
