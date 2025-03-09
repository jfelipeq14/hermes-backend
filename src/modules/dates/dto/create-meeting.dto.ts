import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsStringRegex, IsZoneRegex } from 'src/utils/regex';

export class CreateMeetingDto {
  @ApiProperty({ required: true, description: 'The zone of the meeting' })
  @IsString()
  @Matches(IsZoneRegex)
  @IsNotEmpty()
  zone: string;

  @ApiProperty({ required: true, description: 'The hour of the meeting' })
  @IsDateString()
  @IsNotEmpty()
  hour: Date;

  @ApiProperty({
    required: true,
    description: 'The description of the meeting',
  })
  @IsString()
  @Matches(IsStringRegex)
  @IsNotEmpty()
  description: string;
}
