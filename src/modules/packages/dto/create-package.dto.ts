import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Name of the package',
    example: 'Cerro Bravo',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'ID of the activity',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  idActivity: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Municipality where the package is located',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  idMunicipality: number;

  @ApiProperty({
    type: 'number',
    required: false,
    description: 'Activity level',
    example: 2,
  })
  @IsInt()
  level: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Price of the package',
    example: 180000,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Reservation price of the package',
    example: 90000,
  })
  @IsInt()
  @IsNotEmpty()
  reserve: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Description of the package',
    example:
      'Cerro Bravo es un lugar turístico en el que se puede disfrutar de la naturaleza y la tranquilidad.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Image of the package',
    example: 'cerro-bravo.jpg',
  })
  @IsString()
  image: string;
}
