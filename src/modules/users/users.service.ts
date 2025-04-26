import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { encrypt } from 'src/providers/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findAllClients() {
    return await this.prisma.users.findMany({
      where: {
        idRole: 3,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newPassword = await encrypt(createUserDto.password);

      // Generate activation token
      const activationToken = crypto.randomBytes(32).toString('hex');

      const user = await this.prisma.users.create({
        data: {
          ...createUserDto,
          password: newPassword,
          activate: false,
          activationToken,
        },
      });

      return {
        ...user,
        message: 'User created successfully. Please activate your account.',
        activationToken,
      };
    } catch {
      throw new HttpException(
        'Error creating user. Please try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!updateUserDto) {
      throw new HttpException('No se pudo actualizar', HttpStatus.BAD_REQUEST);
    }

    if (updateUserDto.password) {
      const newPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = newPassword;
    }

    return await this.prisma.users.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  async changeStatus(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        status: !user.status,
      },
    });

    return updatedUser;
  }

  async generateActivationToken(userId: number) {
    try {
      const token = crypto.randomBytes(32).toString('hex');
      await this.prisma.users.update({
        where: { id: userId },
        data: { activationToken: token },
      });
      return token;
    } catch {
      throw new HttpException(
        'Error generating activation token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async activateUser(userId: number, token: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        id: userId,
        activationToken: token,
        activate: false,
      },
    });

    if (!user) {
      throw new HttpException(
        'Invalid activation token or account already activated',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.users.update({
      where: { id: userId },
      data: {
        activate: true,
        activationToken: null,
      },
    });
  }
}
