import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';

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
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ required: true, description: 'Price of the reservation' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: true, description: 'Status of the reservation' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
export class DetailReservationTravelersDto {
  @ApiProperty({ required: true, description: 'Reservation of the traveler' })
  @IsNotEmpty()
  @IsInt()
  idReservation: number;

  @ApiProperty({ required: true, description: 'Traveler of the reservation' })
  @IsNotEmpty()
  @IsInt()
  idTraveler: number;

  @ApiProperty({ required: true, description: 'Status of the traveler' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
