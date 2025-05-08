// src/biolink/biolink.repository.ts
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { VisitLogEntity } from './entities/visit-log.entity';

@Injectable()
export class visitLogRepository extends Repository<VisitLogEntity> {
  // Additional custom methods can be added here if needed
}
