import { Module } from '@nestjs/common';
import { TravelersService } from './travelers.service';
import { TravelersController } from './travelers.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TravelersController],
  providers: [TravelersService],
})
export class TravelersModule {}
