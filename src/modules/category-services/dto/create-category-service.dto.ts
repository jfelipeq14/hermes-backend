import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryServiceDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

}
