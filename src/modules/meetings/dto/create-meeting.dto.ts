import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsZoneRegex } from 'src/utils/regex';
import { CHARS_VALUE, DESCRIPTION_VALUE } from 'src/utils/values';

export class CreateMeetingDto {
  @ApiProperty({ required: true, description: 'Meeting date' })
  @IsInt()
  @IsNotEmpty()
  idDate: number;

  @ApiProperty({ required: true, description: 'Zone' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(CHARS_VALUE)
  @Matches(IsZoneRegex)
  zone: string;

  @ApiProperty({ required: true, description: 'Hour' })
  @IsDateString()
  @IsNotEmpty()
  hour: Date;

  @ApiProperty({ required: true, description: 'Description of the meeting' })
  @IsString()
  @MaxLength(DESCRIPTION_VALUE)
  description: string;
}
