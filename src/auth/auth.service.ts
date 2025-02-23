import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {
    const foundUser = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) return null;

    if (foundUser.password !== user.password) 
        return this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.idRole,
      });
  }
}
