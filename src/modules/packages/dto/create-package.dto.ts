import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({ required: true, description: 'Name of the package' })
  @IsString()
  @IsNotEmpty()
  activity: string;

  @ApiProperty({ required: true, description: 'Start date of the package' })
  @IsDate()
  @IsNotEmpty()
  start: number;

  @ApiProperty({ required: true, description: 'End date of the package' })
  @IsDate()
  @IsNotEmpty()
  end: number;

  @ApiProperty({ required: true, description: 'Name of the activity' })
  @IsInt()
  @IsNotEmpty()
  idActivity: number;

  @ApiProperty({ required: true, description: 'Activity level (hiking only)' })
  @IsDecimal()
  level: number;

  @ApiProperty({ required: true, description: 'Price of the package' })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true, description: 'Price of the reservation' })
  @IsDecimal()
  @IsNotEmpty()
  reserve: number;

  @ApiProperty({ required: true, description: 'Description of the package' })
  @IsString()
  description: string;

  @ApiProperty({ required: true, description: 'Status of the package' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
