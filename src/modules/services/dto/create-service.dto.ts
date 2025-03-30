import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';
import { NAMES_MAXVALUE } from 'src/utils/values';

export class CreateServiceDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Id of the category service',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  idCategoryServices: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Name of the service',
    example: 'Transporte',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NAMES_MAXVALUE)
  @Matches(IsStringRegex)
  name: string;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Price of the service',
    example: 520000,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;
}
