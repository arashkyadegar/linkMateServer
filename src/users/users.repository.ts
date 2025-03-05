// src/biolink/biolink.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  // Additional custom methods can be added here if needed
}
