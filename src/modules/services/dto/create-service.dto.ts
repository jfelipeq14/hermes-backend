import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsPriceRegex, IsStringRegex } from 'src/utils/regex';
import { NAMES_VALUE, PRICE_VALUE } from 'src/utils/values';

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
  @IsNumber()
  @IsNotEmpty()
  @MaxLength(PRICE_VALUE)
  @Matches(IsPriceRegex)
  price: number;
}
