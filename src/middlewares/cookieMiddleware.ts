import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: Response, next: NextFunction) {
    console.log('AuthMiddleware is called');

    const sessionToken = req.cookies['access-token'];

    if (!sessionToken) {
      throw new UnauthorizedException('access-token is missing');
    }

    const decodedToken = this.jwtService.verify(sessionToken);

    if (!decodedToken) {
      throw new UnauthorizedException('access-token is not valid');
    }

    req.userId = decodedToken.userResult._id;
    next();
  }
}
