import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';

export class CreatePrivilegeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsStringRegex)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  idPermit: number;
}
