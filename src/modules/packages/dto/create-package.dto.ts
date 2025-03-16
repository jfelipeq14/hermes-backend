import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  Matches,
  Min,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsStringRegex } from 'src/utils/regex';
import { DESCRIPTION_VALUE, NAMES_VALUE } from 'src/utils/values';

class CreateDetailPackageServiceDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  idService: number;

  @ApiProperty({ required: true })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;
}

export class CreatePackageDto {
  @ApiProperty({ required: true, description: 'Name of the package' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NAMES_VALUE)
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

  @ApiProperty({ required: true, description: 'Name of the activity' })
  @IsInt()
  @IsNotEmpty()
  idActivity: number;

  @ApiProperty({ required: true, description: 'Activity level (hiking only)' })
  @IsNumber()
  level: number;

  @ApiProperty({ required: true, description: 'Price of the package' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({ required: true, description: 'Price of the reservation' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  reserve: number;

  @ApiProperty({ required: true, description: 'Description of the package' })
  @IsString()
  @MaxLength(DESCRIPTION_VALUE)
  description: string;

  @ApiProperty({ type: [CreateDetailPackageServiceDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetailPackageServiceDto)
  detailPackagesServices: CreateDetailPackageServiceDto[];
}
