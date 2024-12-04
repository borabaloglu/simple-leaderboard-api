import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

import { jwtConfig } from '@/libs/configs/jwt.config';

@Injectable()
export class MainAuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

      const payload = verify(token, jwtConfig.secret) as JwtPayload;

      request.user = {
        id: payload.id,
        username: payload.username,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
