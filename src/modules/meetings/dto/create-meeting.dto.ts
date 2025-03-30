import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsZoneRegex } from 'src/utils/regex';
import { CHARS_MAXVALUE, DESCRIPTION_MAXVALUE } from 'src/utils/values';

export class CreateMeetingDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Meeting date',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  idDate: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Zone',
    example: 'S',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(CHARS_MAXVALUE)
  @Matches(IsZoneRegex)
  zone: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Hour',
    example: '05:00:00',
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Hour must be in the format HH:mm:ss',
  })
  hour: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Description of the meeting',
    example:
      'Los encuentros de la zona sur se hacen en: Estacion Parque Berrio, Estacion Poblado y Estacion Envigado',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(DESCRIPTION_MAXVALUE)
  description: string;
}
