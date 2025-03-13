import {
  AuthTokenResult,
  IUseToken,
} from 'src/modules/auth/interfaces/authenticated-user.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decoded = jwt.decode(token) as AuthTokenResult;

    const currentDate = new Date();
    const expirationDate = new Date(decoded.exp);

    return {
      role: decoded.role,
      sub: decoded.sub,
      isExpired: +expirationDate < +currentDate / 1000,
    };
  } catch (error) {
    return 'Invalid token ' + error;
  }
};
