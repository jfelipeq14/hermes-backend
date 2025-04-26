/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from 'src/config/prisma/prisma.service';
import { compare, encrypt } from 'src/providers/bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/log-in';
import { ResetPasswordDto } from './dto/request-reset-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { SubmitEmailTokenDto } from './dto/submit-email-token.dto';
import * as crypto from 'crypto';

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

      // Generate activation token
      const activationToken = crypto.randomBytes(32).toString('hex');

      const user = await this.prisma.users.create({
        data: {
          ...signUpDto,
          password: hashedPassword,
          activate: false,
          activationToken,
        },
      });

      const { password, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        message:
          'User created successfully. Please activate your account using the activation token.',
        activationToken, // Return token so it can be used for activation
      };
    }

    throw new BadRequestException('User already exists');
  }

  async logIn(logInDto: LogInDto) {
    const userFound = await this.prisma.users.findUnique({
      where: {
        email: logInDto.email,
      },
    });

    if (!userFound) throw new BadRequestException('Invalid credentials');

    // Check if account is activated
    if (!userFound.activate) {
      throw new BadRequestException(
        'Account not activated. Please activate your account first.',
      );
    }

    const isPasswordMatch = await compare(
      logInDto.password,
      userFound.password,
    );

    if (!isPasswordMatch) throw new BadRequestException('Invalid credentials');

    const { password, ...userWithoutPassword } = userFound;

    const payload = {
      ...userWithoutPassword,
      passwordUpdatedAt: userFound.passwordUpdatedAt, // Incluir la fecha de última actualización de la contraseña
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  // Reset password

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
        passwordUpdatedAt: new Date(), // Actualizar la fecha de última actualización de la contraseña
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

    const resetToken = await encrypt(
      submitEmailTokenDto.email + Date.now().toString(),
    );

    await this.prisma.users.update({
      where: { email: submitEmailTokenDto.email },
      data: {
        resetPasswordToken: resetToken,
      },
    });

    return {
      message: 'Reset password token has been generated',
      token: resetToken,
    };
  }

  //Actiavte acount

  async sendActivationToken(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.activate) {
      throw new BadRequestException('Account is already activated');
    }

    // Generate new activation token
    const activationToken = crypto.randomBytes(32).toString('hex');

    await this.prisma.users.update({
      where: { email },
      data: { activationToken },
    });

    return {
      message: 'Activation token has been generated',
      token: activationToken,
    };
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const { email, activationUserToken } = activateUserDto;

    // Buscar al usuario con el token de activación
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        activationToken: activationUserToken,
        activate: false, // Verificar que la cuenta no esté activada
      },
    });

    // Validar si el usuario existe y el token es válido
    if (!user) {
      throw new BadRequestException(
        'Invalid activation token or account already activated',
      );
    }

    // Actualizar el estado de activación del usuario
    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        activate: true, // Activar la cuenta
        activationToken: null, // Eliminar el token de activación
      },
    });

    return { message: 'Account activated successfully' };
  }
}
