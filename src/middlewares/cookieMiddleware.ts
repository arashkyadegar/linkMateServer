import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Cookie middleware is called');
    const sessionToken = req.cookies['access-token'];

    if (!sessionToken) {
      throw new UnauthorizedException('access-token is missing');
    }

    // Add your cookie validation logic here, e.g., verify session token
    // For example, validate the session token against your database

    next();
  }
}
