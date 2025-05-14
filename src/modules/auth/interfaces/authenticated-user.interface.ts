import { Role } from '../../roles/entities/role.entity';

export interface AuthenticatedUserRequest extends Request {
  user: {
    id: number;
    email: string;
    role: Role;
  };
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
