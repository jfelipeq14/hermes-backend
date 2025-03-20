import { Module } from '@nestjs/common';
import { PackageServiceService } from './package-service.service';
import { PackageServiceController } from './package-service.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PackageServiceController],
  providers: [PackageServiceService],
})
export class PackageServiceModule {}
