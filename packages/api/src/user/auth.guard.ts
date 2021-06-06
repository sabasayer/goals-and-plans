import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { AUTH_TOKEN_HEADER_KEY, AUTH_TOKEN_PREFIX } from './auth.const';
import { JWT_SECRET } from './jwt.secret';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authToken = ctx.headers[AUTH_TOKEN_HEADER_KEY];
    if (!authToken) return false;

    ctx.user = this.validateToken(authToken);

    return true;
  }

  private validateToken(auth: string) {
    const parts = auth.split(' ');
    if (parts[0] !== AUTH_TOKEN_PREFIX)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    try {
      return jwt.verify(parts[1], JWT_SECRET);
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
