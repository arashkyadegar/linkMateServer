import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { BioLinksModule } from './bio-links/bio-links.module';
import { MapsModule } from './maps/maps.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioLinkEntity } from './bio-links/biolink.entity';
import { MapEntity } from './maps/map.entity';
import { LinksModule } from './links/links.module';
import { SuperLinksModule } from './super-links/super-links.module';
import { ImagesModule } from './images/images.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'arashk',
      database: 'dmpanel',
      entities: [BioLinkEntity, MapEntity],
      synchronize: true,
    }),
    ImagesModule,
    SuperLinksModule,
    LinksModule,
    DepartmentsModule,
    MapsModule,
    BioLinksModule,
    ImagesModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
