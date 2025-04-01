import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OptionalAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: Response, next: NextFunction) {
    console.log('OptionalAuthMiddleware is called');

    const sessionToken = req.cookies['access-token'];

    if (sessionToken) {
      try {
        const decodedToken = this.jwtService.verify(sessionToken);
        req.userId = decodedToken.userResult._id; // Attach userId for authenticated users
      } catch (error) {
        console.log('Invalid token, proceeding as unauthenticated user.');
      }
    } else {
      console.log('No token, proceeding as unauthenticated user.');
    }

    next(); // Always let the request proceed
  }
}
