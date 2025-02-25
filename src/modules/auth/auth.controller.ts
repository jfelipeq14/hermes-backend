import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from '../../modules/auth/dto/create-auth.dto';
import { AuthService } from './auth.service';
import { Public } from '@prisma/client/runtime/library';
import { IsPublic } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @IsPublic()
  async login(@Body() data: LoginDto) {
    try {
      return await this.authService.validateUser(data);
    } catch (error) {
      console.log(error);
      
    }
  }
}