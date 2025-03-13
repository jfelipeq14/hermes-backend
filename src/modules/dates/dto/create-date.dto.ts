import { IsDateString, IsNotEmpty, Matches, IsInt, Min } from 'class-validator';
import { IsDateRegex } from 'src/utils/regex';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDateDto {
  @ApiProperty({
    required: true,
    description: 'The date of the start of the event',
  })
  @IsDateString()
  @IsNotEmpty()
  @Matches(IsDateRegex)
  start: Date;

  @ApiProperty({
    required: true,
    description: 'The date of the end of the event',
  })
  @IsDateString()
  @IsNotEmpty()
  @Matches(IsDateRegex)
  end: Date;

  @ApiProperty({ required: true, description: 'The start registration date' })
  @IsDateString()
  @IsNotEmpty()
  @Matches(IsDateRegex)
  startRegistration: Date;

  @ApiProperty({ required: true, description: 'The end registration date' })
  @IsDateString()
  @IsNotEmpty()
  @Matches(IsDateRegex)
  endRegistration: Date;

  @ApiProperty({ required: true, description: 'The package of the date' })
  @IsInt()
  @IsNotEmpty()
  idPackage: number;

  @ApiProperty({ required: true, description: 'The amount of the date' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  amount: number;
}
