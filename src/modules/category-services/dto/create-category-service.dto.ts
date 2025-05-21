import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsBoolean,
  MinLength,
  Matches,
} from 'class-validator';
import { IsNameRegex } from 'src/utils/regex';
import { NAMES_MAXVALUE, NAMES_MINVALUE } from 'src/utils/values';

export class CreateCategoryServiceDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Nombre de la categoría',
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
    type: 'boolean',
    required: true,
    description: 'Estado de la categoría',
    example: true,
  })
  @IsBoolean({
    message: 'El campo de estado debe ser un booleano (true o false)',
  })
  @IsNotEmpty({
    message: 'El campo de estado no puede estar vacío',
  })
  status: boolean;
}
