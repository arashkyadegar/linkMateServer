import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { EnvConfigService } from 'src/env-config/env-config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly envConfigService: EnvConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthMiddleware is called');
    const token =
      req.headers['authorization']?.split(' ')[1] || req.cookies['token'];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify the token (use your secret key)
      const decoded = jwt.verify(token, this.envConfigService.getJwtSecret() || 'ABCD');
      console.log(decoded);
      req['user'] = decoded; // Attach user info to the request object
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
