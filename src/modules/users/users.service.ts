import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createUserDto: CreateUserDto) {
    try {
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
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.users.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
