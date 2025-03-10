import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsEmailRegex, IsPassword } from 'src/utils/regex';

export class LogInDto {
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
