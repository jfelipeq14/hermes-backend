import { Controller, Get } from '@nestjs/common';
import { PrivilegesService } from './privileges.service';

@Controller('privileges')
export class PrivilegesController {
  constructor(private readonly privilegesService: PrivilegesService) {}

  // @Post()
  // create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
  //   return this.privilegesService.create(createPrivilegeDto);
  // }

  @Get()
  findAll() {
    return this.privilegesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.privilegesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePrivilegeDto: UpdatePrivilegeDto) {
  //   return this.privilegesService.update(+id, updatePrivilegeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.privilegesService.remove(+id);
  // }
}
