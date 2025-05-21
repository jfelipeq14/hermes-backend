import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up';
import { LogInDto } from './dto/log-in';
import { IsPublic } from './decorators/public.decorator';
import { ResetPasswordDto } from './dto/request-reset-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { SubmitEmailTokenDto } from './dto/submit-email-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('log-in')
  async logIn(@Body() logInDto: LogInDto) {
    const login = await this.authService.logIn(logInDto);
    if (!login) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return login;
  }

  @IsPublic()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const signup = await this.authService.signUp(signUpDto);
    if (!signup) {
      throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
    }
    return signup;
  }

  @IsPublic()
  @Post('activate')
  async activate(@Body() activateUserDto: ActivateUserDto) {
    const activate = await this.authService.activateUser(activateUserDto);

    if (!activate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return activate;
  }

  @IsPublic()
  @Post('restore-password')
  async restorePassword(@Body() submitEmailTokenDto: SubmitEmailTokenDto) {
    const restore = await this.authService.restorePassword(submitEmailTokenDto);

    if (!restore) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return restore;
  }

  @IsPublic()
  @Patch('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const reset = await this.authService.resetPassword(resetPasswordDto);
    if (!reset) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return reset;
  }

  @IsPublic()
  @Patch('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    const change = await this.authService.changePassword(
      changePasswordDto,
      user,
    );

    if (!change) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return change;
  }
}
