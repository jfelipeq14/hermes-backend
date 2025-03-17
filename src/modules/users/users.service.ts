import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.users.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = newPassword;

      return this.prisma.users.create({
        data: createUserDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.users.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      console.log(error);
    }
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
