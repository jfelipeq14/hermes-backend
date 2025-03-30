import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

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
}
