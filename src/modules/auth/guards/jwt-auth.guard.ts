/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/modules/users/users.service';
import { IS_PUBLIC_KEY } from 'src/utils/constants/key-decorator';
import { IUseToken } from '../interfaces/authenticated-user.interface';
import { useToken } from 'src/utils/use.token';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private userService: UsersService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['codrr_token'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }
    const manageToken: IUseToken | string = useToken(token);
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }
    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }
    const { sub } = manageToken;
    const user = await this.userService.findOne(parseInt(sub));
    if (!user) {
      throw new UnauthorizedException('User invalid');
    }
    request['idUser'] = user.id;
    request['idRole'] = user.idRole;
    return true;
  }
}
