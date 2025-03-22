// src/biolink/biolink.repository.ts
import { Repository } from 'typeorm';
import { ShortLinkEntity } from './entities/short-link.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortLinkRepository extends Repository<ShortLinkEntity> {
  // Additional custom methods can be added here if needed
}
