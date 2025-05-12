import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateTravelerDto {
  @ApiProperty({ required: true, description: 'Id of the traveler' })
  @IsInt()
  @IsNotEmpty()
  idTraveler: number;
}
export class CreateReservationDto {
  @ApiProperty({ required: true, description: 'Date of the programation' })
  @IsNotEmpty()
  @IsInt()
  idDate: number;

  @ApiProperty({ required: true, description: 'User who made the reservation' })
  @IsNotEmpty()
  @IsInt()
  idUser: number;

  @ApiProperty({ required: true, description: 'Price of the reservation' })
  @IsNumber()
  price: number;

  @ApiProperty({ type: [CreateTravelerDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTravelerDto)
  detailReservationTravelers: CreateTravelerDto[];
}
