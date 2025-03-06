import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from './map.entity';
import { MapRepository } from './maps.repository';
import { MapsController } from './maps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MapEntity])],
  providers: [MapsService],
  exports: [MapsService],
  controllers: [MapsController],
})
export class MapsModule {}
