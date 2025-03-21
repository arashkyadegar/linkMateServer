import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvConfigService {
  getJwtSecret(): string {
    return process.env.JWT_SECRET || 'ABCD';
  }

  getPageSize(): number {
    return Math.min(
      Math.max(parseInt(process.env.PAGE_SIZE || '10', 10), 1),
      50,
    );
  }
}
