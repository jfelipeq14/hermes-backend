import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryServiceDto {
  @ApiProperty({ required: true })
  name: string;
}
