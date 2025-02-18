import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  idCategoryServices: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
