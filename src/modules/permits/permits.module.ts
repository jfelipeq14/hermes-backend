import { Module } from '@nestjs/common';
import { PermitsService } from './permits.service';
import { PermitsController } from './permits.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PermitsController],
  providers: [PermitsService],
})
export class PermitsModule {}
