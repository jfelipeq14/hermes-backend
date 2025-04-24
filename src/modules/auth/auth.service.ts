/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from 'src/config/prisma/prisma.service';
import { compare, encrypt } from 'src/providers/bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/log-in';
import { ResetPasswordDto } from './dto/request-reset-password.dto';
import { SubmitEmailTokenDto } from './dto/submit-email-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const userFound = await this.prisma.users.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (!userFound) {
      const hashedPassword = await encrypt(signUpDto.password);
      const user = await this.prisma.users.create({
        data: { ...signUpDto, password: hashedPassword },
      });

      const { password: _, ...userWithoutPassword } = user;

      return userWithoutPassword;
    }
  }

  async logIn(logInDto: LogInDto) {
    const userFound = await this.prisma.users.findUnique({
      where: {
        email: logInDto.email,
      },
    });

    if (!userFound) throw new BadRequestException('Invalid credentials');

    const isPasswordMatch = await compare(
      logInDto.password,
      userFound.password,
    );

    if (!isPasswordMatch) throw new BadRequestException('Invalid credentials');

    const { password: _, ...userWithoutPassword } = userFound;

    const payload = {
      ...userWithoutPassword,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const userFound = await this.prisma.users.findUnique({
      where: {
        resetPasswordToken: resetPasswordDto.resetPasswordToken,
      },
    });

    if (!userFound) throw new BadRequestException('Invalid reset token');

    const hashedPassword = await encrypt(resetPasswordDto.newPassword);

    await this.prisma.users.update({
      where: {
        resetPasswordToken: resetPasswordDto.resetPasswordToken,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
      },
    });

    return { message: 'Password reset successfully' };
  }

  async submitEmailToken(submitEmailTokenDto: SubmitEmailTokenDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: submitEmailTokenDto.email,
      },
    });
    
    if (!user) {
      throw new BadRequestException('User not found');
    }
    
    const resetToken = await encrypt(submitEmailTokenDto.email + Date.now().toString());
    
    await this.prisma.users.update({
      where: { email: submitEmailTokenDto.email },
      data: {
        resetPasswordToken: resetToken,
      },
    });

    return { 
      message: 'Reset password token has been generated',
      token: resetToken
    };
  }
}
