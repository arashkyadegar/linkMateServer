import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract token from headers or cookies

    // Debug: Check if middleware is called
    console.log('AuthMiddleware is called');
    const token =
      req.headers['authorization']?.split(' ')[1] || req.cookies['token'];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify the token (use your secret key)
      const decoded = jwt.verify(token, jwtConstants.secret || 'ABCD');
      console.log(decoded)
      req['user'] = decoded; // Attach user info to the request object
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
