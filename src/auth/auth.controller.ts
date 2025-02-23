import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const userToken = await this.authService.validateUser(data);

    if(!userToken) throw new HttpException('User not found',HttpStatus.NOT_FOUND );

    return userToken;
  }
}
 