import { Controller, Get } from '@nestjs/common';
import { PermitsService } from './permits.service';

@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}

  // @Post()
  // create(@Body() createPermitDto: CreatePermitDto) {
  //   return this.permitsService.create(createPermitDto);
  // }

  @Get()
  findAll() {
    return this.permitsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.permitsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePermitDto: UpdatePermitDto) {
  //   return this.permitsService.update(+id, updatePermitDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.permitsService.remove(+id);
  // }
}
