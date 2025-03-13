import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';
import { NAMES_VALUE } from 'src/utils/values';

export class CreateActivityDto {
  @ApiProperty({ required: true, description: 'Name of the activity' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NAMES_VALUE)
  @Matches(IsStringRegex)
  name: string;
}
