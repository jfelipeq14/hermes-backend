import { IsDateString, IsNotEmpty, Matches, IsInt, Min } from 'class-validator';
import { IsDateRegex } from 'src/utils/regex';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDateDto {
  @ApiProperty({
    required: true,
    description: 'The date of the start of the event',
  })
  @IsDateString()
  @Matches(IsDateRegex)
  @IsNotEmpty()
  start: Date;

  @ApiProperty({
    required: true,
    description: 'The date of the end of the event',
  })
  @IsDateString()
  @Matches(IsDateRegex)
  @IsNotEmpty()
  end: Date;

  @ApiProperty({ required: true, description: 'The start registration date' })
  @IsDateString()
  @Matches(IsDateRegex)
  @IsNotEmpty()
  startRegistration: Date;

  @ApiProperty({ required: true, description: 'The end registration date' })
  @IsDateString()
  @Matches(IsDateRegex)
  @IsNotEmpty()
  endRegistration: Date;

  @ApiProperty({ required: true, description: 'The package of the date' })
  @IsInt()
  @IsNotEmpty()
  idPackage: number;

  @ApiProperty({ required: true, description: 'The amount of the date' })
  @IsInt()
  // @Matches(IsNumberRegex)
  @Min(1)
  @IsNotEmpty()
  amount: number;
}
