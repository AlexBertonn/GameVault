import {
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    if (!auth) {
      throw new UnauthorizedException("Request is missing 'Authorization' header.");
    }

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException("'Authorization' header is not of type 'Bearer'.");
    }
    if (!token) {
      throw new UnauthorizedException('Invalid Bearer token.');
    }

    this.jwtService.decode(token, { json: true });
    return true;
  }
}