// src/biolink/biolink.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { MapEntity } from './map.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapRepository extends Repository<MapEntity> {
  // Additional custom methods can be added here if needed
}