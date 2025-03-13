import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY } from 'src/utils/constants/key-decorator';
import { ACCESS_LEVEL } from 'src/utils/constants/roles';

export const Accesslevel = (level: keyof typeof ACCESS_LEVEL) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
