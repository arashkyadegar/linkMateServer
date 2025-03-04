import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from './map.entity';
import { MapRepository } from './maps.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MapEntity])],
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}
