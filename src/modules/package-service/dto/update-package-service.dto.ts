import { PartialType } from '@nestjs/swagger';
import { CreatePackageDto } from 'src/modules/packages/dto/create-package.dto';

export class UpdatePackageServiceDto extends PartialType(CreatePackageDto) {
  id: number;
}
