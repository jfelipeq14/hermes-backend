import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryServiceDto } from './create-category-service.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryServiceDto extends PartialType(
  CreateCategoryServiceDto,
) {
  @ApiProperty({ required: true })
  name: string;
}
