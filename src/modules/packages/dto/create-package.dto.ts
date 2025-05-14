import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsImageRegex, IsLevelRegex, IsNameRegex } from 'src/utils/regex';
import {
  NAMES_MAXVALUE,
  NAMES_MINVALUE,
  PRICE_MAXVALUE,
  PRICE_MINVALUE,
} from 'src/utils/values';
export class CreatePackageServiceDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Identificador del servicio',
    example: 1,
  })
  @IsInt({
    message: 'El campo idService debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo idService debe ser un valor positivo',
  })
  @IsNotEmpty({
    message: 'El campo idService no puede estar vacío',
  })
  idService: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Cantidad de servicios',
    example: 2,
  })
  @IsInt({
    message: 'El campo quantity debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo quantity debe ser un valor positivo',
  })
  @IsNotEmpty({
    message: 'El campo quantity no puede estar vacío',
  })
  quantity: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Precio del servicio',
    example: 43000,
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
export class CreatePackageDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Nombre del paquete',
    example: 'Aventura natural',
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
    description: 'Identificador de la actividad',
    example: 1,
  })
  @IsInt({
    message: 'El campo idActivity debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo idActivity debe ser un valor positivo',
  })
  @IsNotEmpty({
    message: 'El campo idActivity no puede estar vacío',
  })
  idActivity: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Municipio en donde se realiza la actividad',
    example: 2,
  })
  @IsInt({
    message: 'El campo idMunicipality debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo idMunicipality debe ser un valor positivo',
  })
  @IsNotEmpty({
    message: 'El campo idMunicipality no puede estar vacío',
  })
  idMunicipality: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Nivel de la actividad',
    example: 2,
  })
  @IsInt({
    message: 'El campo level debe ser un número entero',
  })
  @Min(0, {
    message: 'El campo level debe ser un valor positivo',
  })
  @IsNotEmpty({
    message: 'El campo level no puede estar vacío',
  })
  @Matches(IsLevelRegex, {
    message: 'El campo level solo puede contener números enteros entre 0 y 5',
  })
  level: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Precio del paquete por persona',
    example: 180000,
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

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Precio para reservar el paquete',
    example: 90000,
  })
  @IsInt({
    message: 'El campo de reserva debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo de reserva debe ser un valor positivo',
  })
  @IsNotEmpty({
    message: 'El campo de reserva no puede estar vacío',
  })
  @MinLength(PRICE_MINVALUE, {
    message: `El campo de reserva debe tener al menos ${PRICE_MINVALUE} caracteres`,
  })
  @MaxLength(PRICE_MAXVALUE, {
    message: `El campo de reserva no puede tener más de ${PRICE_MAXVALUE} caracteres`,
  })
  reserve: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Descripcion del paquete',
    example:
      'Cerro Bravo es un lugar turístico en el que se puede disfrutar de la naturaleza y la tranquilidad.',
  })
  @IsString({
    message: 'El campo de descripción debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El campo de descripción no puede estar vacío',
  })
  @MinLength(4, {
    message: 'El campo de descripción debe tener al menos 4 caracteres',
  })
  @MaxLength(255, {
    message: 'El campo de descripción no puede tener más de 255 caracteres',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Imagen del paquete',
    example: 'cerro-bravo.jpg',
  })
  @IsString({
    message: 'El campo de imagen debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El campo de imagen no puede estar vacío',
  })
  @MinLength(4, {
    message: 'El campo de imagen debe tener al menos 4 caracteres',
  })
  @MaxLength(255, {
    message: 'El campo de imagen no puede tener más de 255 caracteres',
  })
  @Matches(IsImageRegex, {
    message:
      'El campo de imagen solo puede tener formatos de imagen válidos (jpg, jpeg, png)',
  })
  image: string;

  @ApiProperty({
    type: [CreatePackageServiceDto],
    required: true,
    description: 'Lista de servicios para el paquete',
    example: [
      {
        idService: 1,
        quantity: 1,
        price: 25000,
      },
      {
        idService: 2,
        quantity: 1,
        price: 8000,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePackageServiceDto)
  detailPackagesServices: CreatePackageServiceDto[];
}
