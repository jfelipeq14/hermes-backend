import { PartialType } from '@nestjs/swagger';
import { CreatePackageServiceDto } from './create-package-service.dto';

export class UpdatePackageServiceDto extends PartialType(CreatePackageServiceDto) {}
