import { Module } from '@nestjs/common';
import { BioLinksService } from './bio-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioLinksController } from './bio-links.controller';
import { BioLinkEntity } from './biolink.entity';
import { MapsModule } from 'src/maps/maps.module';
import { LinksModule } from 'src/links/links.module';
import { SuperLinksModule } from 'src/super-links/super-links.module';
import { ImagesModule } from 'src/images/images.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([BioLinkEntity]),
    MapsModule,
    LinksModule,
    SuperLinksModule,
    ImagesModule
  ],
  controllers: [BioLinksController],
  providers: [BioLinksService],
})
export class BioLinksModule {}
