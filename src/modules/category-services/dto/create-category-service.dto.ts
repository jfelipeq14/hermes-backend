import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';

export class CreateCategoryServiceDto {
  @ApiProperty({ required: true, description: 'Name of the category' })
  @IsString()
  @Matches(IsStringRegex)
  @IsNotEmpty()
  name: string;
}
