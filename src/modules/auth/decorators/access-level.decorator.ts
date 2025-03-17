import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY } from 'src/utils/constants/key-decorator';

export const Accesslevel = (level: number) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
