import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  uploadPackageImage(image: any) {
    console.log(image);
  }
}
