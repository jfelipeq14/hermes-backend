import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  Matches,
  ValidateNested,
} from 'class-validator';
import { IsNumberRegex } from 'src/utils/regex';
import { CreateMeetingDto } from './create-meeting.dto';

export class CreateDateDto {
  @ApiProperty({
    required: true,
    description: 'The date of the start of the event',
  })
  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @ApiProperty({
    required: true,
    description: 'The date of the end of the event',
  })
  @IsDateString()
  @IsNotEmpty()
  end: Date;

  @ApiProperty({ required: true, description: 'The start registration date' })
  @IsDateString()
  @IsNotEmpty()
  startRegistration: Date;

  @ApiProperty({ required: true, description: 'The end registration date' })
  @IsDateString()
  @IsNotEmpty()
  endRegistration: Date;

  @ApiProperty({ required: true, description: 'The package of the date' })
  @IsInt()
  @IsNotEmpty()
  idPackage: number;

  @ApiProperty({ required: true, description: 'The amount of the date' })
  @IsInt()
  @Matches(IsNumberRegex)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeetingDto)
  meetings: CreateMeetingDto[];
}
