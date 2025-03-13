import { SetMetadata } from '@nestjs/common';
import { GUIDE_KEY } from 'src/utils/constants/key-decorator';
import { ROLES } from 'src/utils/constants/roles';

export const Guide = (...guide: Array<keyof typeof ROLES.GUIDE>) =>
  SetMetadata(GUIDE_KEY, guide);
