import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/utils/constants/key-decorator';

export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);
