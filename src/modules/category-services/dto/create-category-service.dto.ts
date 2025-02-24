import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryServiceDto {
  @ApiProperty({ required: true, description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
