import { Role } from "../../roles/entities/role.entity";

export interface AuthenticatedUserRequest extends Request {
  user: {
    id: number;
    email: string;
    role: Role;
  };
  
}