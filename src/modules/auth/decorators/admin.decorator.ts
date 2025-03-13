import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from 'src/utils/constants/key-decorator';
import { ROLES } from 'src/utils/constants/roles';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
