import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CategoryServicesModule } from './modules/category-services/category-services.module';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [UsersModule, CategoryServicesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
