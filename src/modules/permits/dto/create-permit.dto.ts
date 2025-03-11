import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';

export class CreatePermitDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsStringRegex)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
