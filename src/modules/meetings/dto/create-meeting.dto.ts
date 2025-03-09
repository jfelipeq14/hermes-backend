import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty({ required: true, description: 'Meeting date' })
  @IsInt()
  @IsNotEmpty()
  idDate: number;

  @ApiProperty({ required: true, description: 'Zone' })
  @IsString()
  @IsNotEmpty()
  zone: string;

  @ApiProperty({ required: true, description: 'Hour' })
  @IsDateString()
  @IsNotEmpty()
  hour: Date;

  @ApiProperty({ required: true, description: 'Description of the meeting' })
  @IsString()
  description: string;
}
