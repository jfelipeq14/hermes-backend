import { Module } from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CategoryServicesController } from './category-services.controller';

@Module({
  controllers: [CategoryServicesController],
  providers: [CategoryServicesService],
})
export class CategoryServicesModule {}
