import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  IS_PUBLIC_KEY,
  ROLES_KEY,
} from 'src/utils/constants/key-decorator';
import { ROLES } from 'src/utils/constants/roles';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
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

    const accessLevel = this.reflector.get<number>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<number>(ADMIN_KEY, context.getHandler());

    const request = context.switchToHttp().getRequest<Request>();

    const { idRole, idUser } = request;

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && idRole === admin) {
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

    const user = await this.userService.findOne(idUser);

    return true;
  }
}
