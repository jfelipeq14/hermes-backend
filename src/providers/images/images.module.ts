import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      dest: './images', // Carpeta donde se guardarán las imágenes
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', '..', 'images'),
      serveRoot: '/images',
    }),
  ],
  controllers: [ImagesController],
})
export class ImagesModule {}
