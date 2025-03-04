import { Module } from '@nestjs/common';

import { BioLinksService } from './bio-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioLinksController } from './bio-links.controller';
import { BioLinkEntity } from './biolink.entity';
import { MapsService } from 'src/maps/maps.service';
import { MapsModule } from 'src/maps/maps.module';

@Module({
  imports: [TypeOrmModule.forFeature([BioLinkEntity]),MapsModule],
  controllers: [BioLinksController],
  providers: [BioLinksService],
})
export class BioLinksModule {}
