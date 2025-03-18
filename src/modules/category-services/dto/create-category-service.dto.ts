import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, MaxLength } from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';
import { NAMES_MAXVALUE } from 'src/utils/values';

export class CreateCategoryServiceDto {
  @ApiProperty({ required: true, description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NAMES_MAXVALUE)
  @Matches(IsStringRegex)
  name: string;
}
