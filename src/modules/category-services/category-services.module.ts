import { Module } from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CategoryServicesController } from './category-services.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryServicesController],
  providers: [CategoryServicesService],
})
export class CategoryServicesModule {}
