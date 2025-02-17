import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CategoryServicesModule } from './modules/category-services/category-services.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [UsersModule, CategoryServicesModule, PrismaModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
