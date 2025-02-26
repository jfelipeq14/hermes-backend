import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

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
  phone: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
