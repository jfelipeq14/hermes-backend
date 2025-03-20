import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermitsModule } from './modules/permits/permits.module';
import { PrivilegesModule } from './modules/privileges/privileges.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { CountriesModule } from './modules/countries/countries.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { MunicipalitiesModule } from './modules/municipalities/municipalities.module';
import { CategoryServicesModule } from './modules/category-services/category-services.module';
import { ServicesModule } from './modules/services/services.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { PackagesModule } from './modules/packages/packages.module';
import { DatesModule } from './modules/dates/dates.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ResponsiblesModule } from './modules/responsibles/responsibles.module';
import { TravelersModule } from './modules/travelers/travelers.module';
import { PackageServiceModule } from './modules/package-service/package-service.module';

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
    PackageServiceModule,
    DatesModule,
    MeetingsModule,
    ResponsiblesModule,
    ReservationsModule,
    TravelersModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
