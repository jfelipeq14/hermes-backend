import { Module } from '@nestjs/common';
import { PackageServiceService } from './package-service.service';
import { PackageServiceController } from './package-service.controller';

@Module({
  controllers: [PackageServiceController],
  providers: [PackageServiceService],
})
export class PackageServiceModule {}
