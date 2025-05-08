import { Module } from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLinksController } from './short-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkEntity } from './entities/short-link.entity';
import { RandomWordsModule } from 'src/random-words/random-words.module';
import { RandomWordsService } from 'src/random-words/random-words.service';
import { VisitLogsService } from 'src/visit-logs/visit-logs.service';
import { VisitLogsModule } from 'src/visit-logs/visit-logs.module';
import { GeoLocationService } from 'src/visit-logs/get-location.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLinkEntity]), RandomWordsModule, VisitLogsModule],
  controllers: [ShortLinksController],
  providers: [ShortLinksService, RandomWordsService,GeoLocationService, VisitLogsService],
})
export class ShortLinksModule { }
