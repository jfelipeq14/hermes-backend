import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import {
  IsBloodRegex,
  IsDocumentTypeRegex,
  IsEmailRegex,
  IsPassword,
  IsPhoneRegex,
  IsSexRegex,
  IsStringRegex,
} from 'src/utils/regex';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  idRole: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsDocumentTypeRegex)
  typeDocument: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsStringRegex)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsStringRegex)
  surName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  dateBirth: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsEmailRegex)
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsPassword)
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  idMunicipality: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsPhoneRegex)
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsPhoneRegex)
  emergency: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsSexRegex)
  sex: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsBloodRegex)
  bloodType: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  eps: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
