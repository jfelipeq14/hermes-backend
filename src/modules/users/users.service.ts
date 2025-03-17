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

  // remove(id: number) {
  //   try {
  //     return this.prisma.users.delete({
  //       where: {
  //         id: id,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
