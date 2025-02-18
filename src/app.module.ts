import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CategoryServicesModule } from './modules/category-services/category-services.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { ServicesModule } from './modules/services/services.module';
import { PackagesModule } from './modules/packages/packages.module';

@Module({
  imports: [PrismaModule, UsersModule, CategoryServicesModule, ServicesModule, PackagesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
