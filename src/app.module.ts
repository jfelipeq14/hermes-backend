import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CategoryServicesModule } from './modules/category-services/category-services.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { ServicesModule } from './modules/services/services.module';
import { CountriesModule } from './modules/countries/countries.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { MunicipalitiesModule } from './modules/municipalities/municipalities.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { PermitsModule } from './modules/permits/permits.module';
import { PrivilegesModule } from './modules/privileges/privileges.module';
import { RolesModule } from './modules/roles/roles.module';
import { DatesModule } from './modules/dates/dates.module';

import { PaymentsModule } from './modules/payments/payments.module';

import { AuthModule } from './modules/auth/auth.module';
import { MeetingsModule } from './modules/meetings/meetings.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PermitsModule,
    PrivilegesModule,
    RolesModule,
    UsersModule,
    CountriesModule,
    DepartmentsModule,
    MunicipalitiesModule,
    CategoryServicesModule,
    ServicesModule,
    ActivitiesModule,
    PackagesModule,
    DatesModule,
    ReservationsModule,
    PaymentsModule,
    MeetingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
