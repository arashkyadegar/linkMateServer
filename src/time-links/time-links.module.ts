import { Module } from '@nestjs/common';
import { TimeLinksService } from './time-links.service';
import { TimeLinksController } from './time-links.controller';
import { RandomWordsModule } from 'src/random-words/random-words.module';
import { TimeLinkEntity } from './entities/time-link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RandomWordsService } from 'src/random-words/random-words.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeLinkEntity]), RandomWordsModule],
  controllers: [TimeLinksController],
  providers: [TimeLinksService,RandomWordsService],
})
export class TimeLinksModule {}
