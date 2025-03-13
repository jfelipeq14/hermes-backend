import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  ADMIN_KEY,
  IS_PUBLIC_KEY,
  ROLES_KEY,
} from 'src/utils/constants/key-decorator';
import { ROLES } from 'src/utils/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const request = context.switchToHttp().getRequest<Request>();

    const { idRole } = request;

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && +idRole === +admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'No tiene permisos para acceder a esta ruta',
        );
      }
    }

    if (idRole === 1) {
      return true;
    }

    const isAuth = roles.some((role) => role === roles[idRole]);
    if (!isAuth) {
      throw new UnauthorizedException(
        'No tiene permisos para acceder a esta ruta',
      );
    }

    return true;
  }
}
