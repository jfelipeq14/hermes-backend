import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/public.decorator';
import { SignUpDto } from './dto/sign-up';
import { LogInDto } from './dto/log-in';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //agreggue estas lineas de codigo
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  //
  @Post('log-in')
  async logIn(@Body() logInDto: LogInDto) {
    try {
      return await this.authService.logIn(logInDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      return await this.authService.signUp(signUpDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
