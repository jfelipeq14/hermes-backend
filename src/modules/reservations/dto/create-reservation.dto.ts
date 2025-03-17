import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ValidateNested,
  Matches,
  Min,
} from 'class-validator';
import { IsDateRegex } from 'src/utils/regex';

class CreateDetailReservationTravelersDto {
  @ApiProperty({ required: true, description: 'Traveler of the reservation' })
  @IsNotEmpty()
  @IsInt()
  idTraveler: number;

  @ApiProperty({ required: true, description: 'Status of the traveler' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

export class CreateReservationDto {
  @ApiProperty({ required: true, description: 'Date of the programation' })
  @IsNotEmpty()
  @IsInt()
  idDate: number;

  @ApiProperty({
    required: true,
    description: 'Municipality of the reservation',
  })
  @IsNotEmpty()
  @IsInt()
  idMunicipality: number;

  @ApiProperty({ required: true, description: 'User who made the reservation' })
  @IsNotEmpty()
  @IsInt()
  idUser: number;

  @ApiProperty({ required: true, description: 'Date of the reservation' })
  @IsDateString()
  @IsNotEmpty()
  @Matches(IsDateRegex)
  date: Date;

  @ApiProperty({ required: true, description: 'Price of the reservation' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({ type: [CreateDetailReservationTravelersDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetailReservationTravelersDto)
  detailReservationTravelers: CreateDetailReservationTravelersDto[];
}
