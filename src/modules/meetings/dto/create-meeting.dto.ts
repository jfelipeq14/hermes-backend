import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Matches,
  IsString,
  MaxLength,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { DESCRIPTION_MAXVALUE } from 'src/utils/values';

export class CreateResponsibleDto {
  @ApiProperty({ required: true, description: 'Id del usuario responsable' })
  @IsInt()
  @IsNotEmpty()
  idUser: number;
}

export class CreateMeetingDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'ID of the date associated with the meeting',
    example: 1,
  })
  @IsNotEmpty()
  idDate: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Zone of the meeting',
    example: 'N',
  })
  @IsString()
  @IsNotEmpty()
  zone: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Hour of the meeting in HH:mm format',
    example: '05:00',
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Hour must be in the format HH:mm',
  })
  hour: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Description of the meeting',
    example: 'Los encuentros se realizarán en: ...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(DESCRIPTION_MAXVALUE)
  description: string;

  @ApiProperty({
    type: [CreateResponsibleDto],
    required: true,
    description: 'List of responsible users',
    example: [
      {
        idUser: 1,
      },
      {
        idUser: 2,
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResponsibleDto)
  responsibles: CreateResponsibleDto[];
}
