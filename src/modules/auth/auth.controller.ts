/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up';
import { LogInDto } from './dto/log-in';
import { IsPublic } from './decorators/public.decorator';
import { ResetPasswordDto } from './dto/request-reset-password.dto';
import { SubmitEmailTokenDto } from './dto/submit-email-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('log-in')
  async logIn(@Body() logInDto: LogInDto) {
    try {
      return await this.authService.logIn(logInDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const user = await this.authService.signUp(signUpDto);
      if (!user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Patch('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return await this.authService.resetPassword(resetPasswordDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Post('submit-token')
  async submitEmailToken(@Body() submitEmailTokenDto: SubmitEmailTokenDto) {
    return this.authService.submitEmailToken(submitEmailTokenDto);
  }
}
