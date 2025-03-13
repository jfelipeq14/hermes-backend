import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/utils/constants/key-decorator';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
