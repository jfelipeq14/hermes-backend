import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
    const newPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = newPassword;

    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!updateUserDto)
      throw new HttpException('No se pudo actualizar', HttpStatus.FOUND);

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
}
