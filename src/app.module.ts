import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { BioLinksModule } from './bio-links/bio-links.module';
import { MapsModule } from './maps/maps.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioLinkEntity } from './bio-links/biolink.entity';
import { MapEntity } from './maps/map.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'arashk',
      database: 'dmpanel',
      entities: [BioLinkEntity,MapEntity],
      synchronize: true,
    }),
    DepartmentsModule,
    MapsModule,
    BioLinksModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
