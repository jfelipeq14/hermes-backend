import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateResponsibleDto {
  @ApiProperty({ required: true, description: 'Id del usuario responsable' })
  @IsInt()
  @IsNotEmpty()
  idUser: number;

  @ApiProperty({ required: true, description: 'Id de la reunion' })
  @IsInt()
  @IsNotEmpty()
  idMeeting: number;
}
