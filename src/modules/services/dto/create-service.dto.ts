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
import { NAMES_VALUE } from 'src/utils/values';

export class CreateServiceDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  idCategoryServices: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NAMES_VALUE)
  @Matches(IsStringRegex)
  name: string;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;
}
