import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreatePackageServiceDto {
  @ApiProperty({
    required: true,
    description: 'ID of the package',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  idPackage: number;

  @ApiProperty({
    required: true,
    description: 'ID of the service',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  idService: number;

  @ApiProperty({
    required: true,
    description: 'Quantity of the service',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @ApiProperty({
    required: true,
    description: 'Price of the service',
    example: 80000,
  })
  @IsInt()
  @IsNotEmpty()
  price: number; // Usamos string para manejar el formato decimal correctamente
}
