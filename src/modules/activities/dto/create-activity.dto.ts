import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { NAMES_MAXVALUE } from 'src/utils/values';

export class CreateActivityDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Name of the activity',
    example: 'Senderismo',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NAMES_MAXVALUE)
  name: string;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Status of the activity',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
