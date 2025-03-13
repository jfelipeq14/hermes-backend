import {
  AuthTokenResult,
  IUseToken,
} from 'src/modules/auth/interfaces/authenticated-user.interface';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

export const useToken = (token: string, secret: string): IUseToken | string => {
  try {
    console.log(token);
    const decoded = jwt.verify(token, secret) as AuthTokenResult;

    const currentDateInSeconds = Math.floor(Date.now() / 1000);

    return {
      role: decoded.role,
      sub: decoded.sub,
      isExpired: decoded.exp < currentDateInSeconds,
    };
  } catch (error) {
    console.error('Error verifying token:', error); // Log para depuración
    throw new UnauthorizedException('Invalid token');
  }
};
