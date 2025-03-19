import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTravelerDto {
  @ApiProperty({ required: true, description: 'Id of the reservation' })
  @IsInt()
  @IsNotEmpty()
  idReservation: number;

  @ApiProperty({ required: true, description: 'Id of the traveler' })
  @IsInt()
  @IsNotEmpty()
  idTraveler: number;

  @ApiProperty({ required: true, description: 'Status of the traveler' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
