import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsNameRegex } from 'src/utils/regex';
import {
  NAMES_MAXVALUE,
  NAMES_MINVALUE,
  PRICE_MAXVALUE,
  PRICE_MINVALUE,
} from 'src/utils/values';

export class CreateServiceDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Identificator de la categoria de servicios',
    example: 1,
  })
  @IsInt({
    message: 'El campo idCategoryServices debe ser un número entero',
  })
  @IsNotEmpty({
    message: 'El campo idCategoryServices no puede estar vacío',
  })
  idCategoryServices: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Nombre del servicio',
    example: 'Transporte',
  })
  @IsString({
    message: 'El campo de nombre debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El campo de nombre no puede estar vacío',
  })
  @MinLength(NAMES_MINVALUE, {
    message: `El campo de nombre debe tener al menos ${NAMES_MINVALUE} caracteres`,
  })
  @MaxLength(NAMES_MAXVALUE, {
    message: `El campo de nombre no puede tener más de ${NAMES_MAXVALUE} caracteres`,
  })
  @Matches(IsNameRegex, {
    message: 'El campo de nombre solo puede contener letras y espacios',
  })
  name: string;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Precio del servicio',
    example: 48000,
  })
  @IsInt({
    message: 'El campo de precio debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo de precio debe ser un valor positivo',
  })
  @IsNotEmpty({
    message: 'El campo de precio no puede estar vacío',
  })
  @MinLength(PRICE_MINVALUE, {
    message: `El campo de precio debe tener al menos ${PRICE_MINVALUE} caracteres`,
  })
  @MaxLength(PRICE_MAXVALUE, {
    message: `El campo de precio no puede tener más de ${PRICE_MAXVALUE} caracteres`,
  })
  price: number;
}
