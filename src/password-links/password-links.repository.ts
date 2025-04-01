// src/biolink/biolink.repository.ts
import { Repository } from 'typeorm';
import { PasswordLinkEntity } from './entities/password-link.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordLinkRepository extends Repository<PasswordLinkEntity> {
  // Additional custom methods can be added here if needed
}
