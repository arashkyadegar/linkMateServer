import { Module } from '@nestjs/common';
import { TimeLinksService } from './time-links.service';
import { TimeLinksController } from './time-links.controller';

@Module({
  controllers: [TimeLinksController],
  providers: [TimeLinksService],
})
export class TimeLinksModule {}
