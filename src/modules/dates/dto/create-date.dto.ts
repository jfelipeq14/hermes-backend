import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateMeetingDto {
  @ApiProperty({ required: true, description: 'The municipality of meeting' })
  @IsInt()
  @IsNotEmpty()
  idMunicipality: number;

  @ApiProperty({ required: true, description: 'The hour of the meeting' })
  @IsDateString()
  @IsNotEmpty()
  hour: Date;

  @ApiProperty({
    required: true,
    description: 'The description of the meeting',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

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

  @ApiProperty({ type: [CreateMeetingDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeetingDto)
  meetings: CreateMeetingDto[];
}
