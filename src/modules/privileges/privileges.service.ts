import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivilegesService {
  findAll() {
    return `This action returns all privileges`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} privilege`;
  // }

  // create(createPrivilegeDto: CreatePrivilegeDto) {
  //   return 'This action adds a new privilege';
  // }
  // update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
  //   return `This action updates a #${id} privilege`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} privilege`;
  // }
}
