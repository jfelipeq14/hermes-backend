import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsEmailRegex, IsPassword, IsPhoneRegex } from 'src/utils/regex';

export class SignUpDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  idRole: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  typeDocument: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  surName: string;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  idMunicipality: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(IsPhoneRegex)
  phone: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  @Matches(IsEmailRegex)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(IsPassword)
  password: string;
}
