// src/biolink/biolink.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { BioLinkEntity } from './biolink.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BioLinkRepository extends Repository<BioLinkEntity> {
  // Additional custom methods can be added here if needed
}