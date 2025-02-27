import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  min,
  minLength,
} from 'class-validator';
import { IsName } from 'src/utils/regex';

export class CreateActivityDto {
  @ApiProperty({ required: true, description: 'Name of the activity' })
  @IsString()
  @Length(3, 250)
  @Matches(IsName)
  @IsNotEmpty()
  name: string;
}
