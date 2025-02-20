import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  idRole: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  typeDocument: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  surName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  dateBirth: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
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
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  emergency: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  sex: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
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
