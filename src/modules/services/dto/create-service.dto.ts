import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { IsPriceRegex, IsStringRegex } from 'src/utils/regex';

export class CreateServiceDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  idCategoryServices: number;

  @ApiProperty({ required: true })
  @IsString()
  @Matches(IsStringRegex)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Matches(IsPriceRegex)
  @IsNotEmpty()
  price: number;
}
