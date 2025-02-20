import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PrivilegesService {
  constructor(private prisma: PrismaService) {}

  create(createPrivilegeDto: CreatePrivilegeDto) {
    try {
      return this.prisma.privileges.create({
        data: createPrivilegeDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.prisma.privileges.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.privileges.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return `This action returns a #${id} privilege`;
  }

  update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    try {
      return this.prisma.privileges.update({
        where: {
          id,
        },
        data: updatePrivilegeDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.privileges.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
