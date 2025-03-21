import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new HttpException('Não autorizado', 401);
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userRole: string = payload.role || '';

      console.log('ROLE -->', userRole);

      const hasRole = () => {
        const permission = requiredRoles.includes(userRole);

        return permission;
      };

      const userPermission = hasRole();

      if (!userPermission) {
        throw new HttpException('Não autorizado', 401);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Não autorizado');
    }
  }
}
