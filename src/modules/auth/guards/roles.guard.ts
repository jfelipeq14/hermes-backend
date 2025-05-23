import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/modules/users/entities/user.entity';
import { PUBLIC_KEY, ROLES_KEY } from 'src/utils/constants/key-decorator';
import { ROLES } from 'src/utils/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest<Request>();
    const user: User = req.user as User;

    if (!user || !user.idRole) {
      throw new UnauthorizedException('No tiene permisos para acceder');
    }

    if (!roles) {
      throw new UnauthorizedException('No tiene permisos para acceder');
    }

    const userRole = Object.keys(ROLES).find(
      (key) => ROLES[key] === user.idRole,
    );

    if (!roles.includes(userRole as keyof typeof ROLES)) {
      throw new UnauthorizedException(
        'No tiene permisos para acceder a esta ruta',
      );
    }

    return true;
  }
}
