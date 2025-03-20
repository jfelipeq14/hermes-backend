import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  Matches,
  IsNumber,
} from 'class-validator';
import { IsDateRegex } from 'src/utils/regex';

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
  @IsNumber()
  price: number;
}
