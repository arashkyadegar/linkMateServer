import { Module } from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLinksController } from './short-links.controller';

@Module({
  controllers: [ShortLinksController],
  providers: [ShortLinksService],
})
export class ShortLinksModule {}
