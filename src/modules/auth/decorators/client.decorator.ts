import { SetMetadata } from '@nestjs/common';
import { CLIENT_KEY } from 'src/utils/constants/key-decorator';
import { ROLES } from 'src/utils/constants/roles';

export const ClientAccess = () => SetMetadata(CLIENT_KEY, ROLES.CLIENT);
