import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CategoryServicesModule } from './modules/category-services/category-services.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { ServicesModule } from './modules/services/services.module';
import { CountriesModule } from './modules/countries/countries.module';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [PrismaModule, UsersModule, CategoryServicesModule, ServicesModule, CountriesModule, DepartmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
