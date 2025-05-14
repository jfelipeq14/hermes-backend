import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PrivilegesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.privileges.findMany();
  }

  findOne(id: number) {
    return this.prisma.privileges.findUnique({
      where: {
        id,
      },
    });
  }

  create(createPrivilegeDto: CreatePrivilegeDto) {
    return this.prisma.privileges.create({
      data: createPrivilegeDto,
    });
  }

  update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    return this.prisma.privileges.update({
      where: {
        id,
      },
      data: updatePrivilegeDto,
    });
  }

  remove(id: number) {
    return this.prisma.privileges.delete({
      where: {
        id,
      },
    });
  }
}
