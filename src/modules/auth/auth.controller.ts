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
import { ActivateUserDto } from './dto/activate-user.dto';
import { SubmitEmailTokenDto } from './dto/submit-email-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('log-in')
  async logIn(@Body() logInDto: LogInDto) {
    try {
      return await this.authService.logIn(logInDto);
    } catch (error: unknown) {
      // Tipamos el error como unknown y luego verificamos su estructura
      const errorMessage =
        error instanceof HttpException
          ? error.message
          : 'Invalid email or password';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const user = await this.authService.signUp(signUpDto);
      return user;
    } catch (error: unknown) {
      // Convertimos el mensaje de error a string de forma segura
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Patch('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return await this.authService.resetPassword(resetPasswordDto);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Post('submit-token')
  async submitEmailToken(@Body() submitEmailTokenDto: SubmitEmailTokenDto) {
    return this.authService.submitEmailToken(submitEmailTokenDto);
  }

  @IsPublic()
  @Post('activate')
  async activate(@Body() activateUserDto: ActivateUserDto) {
    try {
      return await this.authService.activateUser(activateUserDto);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
