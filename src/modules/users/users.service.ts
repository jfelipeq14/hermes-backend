import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
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
