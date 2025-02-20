import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateDateDto {
  @ApiProperty({ required: true, description: 'The date of the event' })
  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @ApiProperty({ required: true, description: 'The date of the event' })
  @IsDateString()
  @IsNotEmpty()
  end: Date;

  @ApiProperty({ required: true, description: 'The title of the event' })
  @IsDateString()
  @IsNotEmpty()
  startRegistration: Date;

  @ApiProperty({ required: true, description: '' })
  @IsDateString()
  @IsNotEmpty()
  endRegistration: Date;

  @ApiProperty({ required: true, description: '' })
  @IsInt()
  @IsNotEmpty()
  idPackage: number;

  @ApiProperty({ required: true, description: '' })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ required: true, description: '' })
  @IsInt()
  @IsNotEmpty()
  idUser: number;

  @ApiProperty({ required: true, description: '' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
