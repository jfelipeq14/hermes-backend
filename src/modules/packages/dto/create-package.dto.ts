import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  IsNumber,
} from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';

export class CreatePackageDto {
  @ApiProperty({ required: true, description: 'Name of the package' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @Matches(IsStringRegex)
  activity: string;

  @ApiProperty({ required: true, description: 'Start date of the package' })
  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @ApiProperty({ required: true, description: 'End date of the package' })
  @IsDateString()
  @IsNotEmpty()
  end: Date;

  @ApiProperty({ required: true, description: 'ID of the activity' })
  @IsInt()
  @IsNotEmpty()
  idActivity: number;

  @ApiProperty({
    required: false,
    description: 'Activity level (e.g., 1.0, 2.5)',
  })
  @IsNumber()
  level: Decimal;

  @ApiProperty({ required: true, description: 'Price of the package' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({
    required: true,
    description: 'Reservation price of the package',
  })
  @IsInt()
  @IsNotEmpty()
  reserve: number;

  @ApiProperty({ required: true, description: 'Description of the package' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
