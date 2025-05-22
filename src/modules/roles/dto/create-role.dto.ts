import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateRolePrivilegesDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  idPrivilege: number;
}

export class CreateRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
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
