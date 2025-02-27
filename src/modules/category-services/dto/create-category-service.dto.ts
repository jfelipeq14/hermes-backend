import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { IsName } from 'src/utils/regex';

export class CreateCategoryServiceDto {
  @ApiProperty({ required: true, description: 'Name of the category' })
  @IsString()
  @Matches(IsName)
  @IsNotEmpty()
  name: string;
}
