import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/public.decorator';
import { SignUpDto } from './dto/sign-up';
import { LogInDto } from './dto/log-in';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  @IsPublic()
  async logIn(@Body() logInDto: LogInDto) {
    try {
      return await this.authService.logIn(logInDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('sign-up')
  @IsPublic()
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      return await this.authService.signUp(signUpDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
