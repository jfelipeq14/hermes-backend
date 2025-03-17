export enum ROLES {
  ADMIN = 1,
  GUIDE = 2,
  CLIENT = 3,
}

export enum ACCESS_LEVEL {
  ADMIN = 16,
  GUIDE = 2,
  CLIENT = 4,
}

export class Roles {
  admin: number = 1;
  guide: number = 2;
  client: number = 2;
}
