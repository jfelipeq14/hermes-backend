/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
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
  constructor(private authService: AuthService) { }

  @Post('log-in')
  async logIn(@Body() logInDto: LogInDto) {
    try {
      return await this.authService.logIn(logInDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const user = await this.authService.signUp(signUpDto);
      if (!user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      return user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
