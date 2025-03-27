import { Module } from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLinksController } from './short-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkEntity } from './entities/short-link.entity';
import { RandomWordsModule } from 'src/random-words/random-words.module';
import { RandomWordsService } from 'src/random-words/random-words.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLinkEntity]), RandomWordsModule],
  controllers: [ShortLinksController],
  providers: [ShortLinksService, RandomWordsService],
})
export class ShortLinksModule {}
