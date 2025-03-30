import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';
import { NAMES_MAXVALUE } from 'src/utils/values';

export class CreateCategoryServiceDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Name of the category',
    example: 'Transporte',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NAMES_MAXVALUE)
  name: string;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Status of the category',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
