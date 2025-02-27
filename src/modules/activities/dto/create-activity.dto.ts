import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';

export class CreateActivityDto {
  @ApiProperty({ required: true, description: 'Name of the activity' })
  @IsString()
  @Matches(IsStringRegex)
  @IsNotEmpty()
  name: string;
}
