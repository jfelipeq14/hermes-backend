import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IsPublic } from 'src/modules/auth/decorators/public.decorator';

@Controller('images')
export class ImagesController {
  @IsPublic()
  @Post('package')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images', // Carpeta donde se guardarán las imágenes
        filename: (req, file, callback) => {
          // Generar un nombre basado en la fecha y hora actual
          const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
          const ext = extname(file.originalname); // Obtener la extensión del archivo
          callback(null, `${timestamp}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Validar el tipo de archivo
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException(
              'Only .jpg, .jpeg, and .png files are allowed',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // Limitar el tamaño del archivo a 10 MB
      },
    }),
  )
  uploadImagePackage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      message: 'Image uploaded successfully',
      filePath: `/images/${image.filename}`, // Ruta pública de la imagen
    };
  }
}
