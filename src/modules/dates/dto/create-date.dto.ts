import { IsDateString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDateDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'The package of the date',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  idPackage: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'The amount of the date',
    example: 39,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(80)
  amount: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The date of the start of the event',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The date of the end of the event',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The start registration date',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startRegistration: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The end registration date',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endRegistration: string;
}
