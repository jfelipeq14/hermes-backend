import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { IsStringRegex } from 'src/utils/regex';

export class CreateRolePrivilegesDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  idPrivilege: number;
}

export class CreateRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(IsStringRegex)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: [CreateRolePrivilegesDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRolePrivilegesDto)
  rolePrivileges: CreateRolePrivilegesDto[];
}
