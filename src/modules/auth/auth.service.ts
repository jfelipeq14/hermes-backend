import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { LoginDto } from '../../modules/auth/dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {
    try {
      const foundUser = (await this.prisma.users.findUnique({
        where: {
          email: user.email,
        },
      })) as any;

      return this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.idRole,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
