import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IsLevelRegex,
  IsNumberRegex,
  IsPriceRegex,
  IsStringRegex,
} from 'src/utils/regex';

class CreateDetailPackageServiceDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  idService: number;

  @ApiProperty({ required: true })
  @IsInt()
  @Matches(IsNumberRegex)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Matches(IsPriceRegex)
  @IsNotEmpty()
  price: number;
}

export class CreatePackageDto {
  @ApiProperty({ required: true, description: 'Name of the package' })
  @IsString()
  @Matches(IsStringRegex)
  @IsNotEmpty()
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
  @Matches(IsLevelRegex)
  level: number;

  @ApiProperty({ required: true, description: 'Price of the package' })
  @IsNumber()
  @Matches(IsPriceRegex)
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true, description: 'Price of the reservation' })
  @IsNumber()
  @Matches(IsPriceRegex)
  @IsNotEmpty()
  reserve: number;

  @ApiProperty({ required: true, description: 'Description of the package' })
  @IsString()
  @Matches(IsStringRegex)
  description: string;

  // @ApiProperty({ required: true, description: 'Status of the package' })
  // @IsBoolean()
  // @IsNotEmpty()
  // status: boolean;

  @ApiProperty({ type: [CreateDetailPackageServiceDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetailPackageServiceDto)
  detailPackagesServices: CreateDetailPackageServiceDto[];
}
