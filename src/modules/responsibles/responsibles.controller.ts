/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { Responsible } from './entities/responsible.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('responsibles')
export class ResponsiblesController {
  constructor(private readonly responsiblesService: ResponsiblesService) {}

  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<Responsible[]> {
    const responsibles_ = await this.responsiblesService.findAll();
    if (!responsibles_ || responsibles_.length === 0)
      throw new HttpException('No existen responsables', HttpStatus.NOT_FOUND);
    return responsibles_;
  }

  @Roles('ADMIN', 'GUIDE')
  @Get(':idUser')
  async findAllByGuide(
    @Param('idUser') idUser: string,
  ): Promise<Responsible[]> {
    const responsibles_ =
      await this.responsiblesService.findAllByGuide(+idUser);
    if (!responsibles_ || responsibles_.length === 0)
      throw new HttpException('No existen responsables', HttpStatus.NOT_FOUND);
    return responsibles_;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Responsible> {
    const responsible_ = await this.responsiblesService.findOne(+id);
    if (!responsible_)
      throw new HttpException('El responsable no existe', HttpStatus.NOT_FOUND);
    return responsible_;
  }

  @Roles('ADMIN')
  @Post()
  async create(
    @Body() createResponsibleDto: CreateResponsibleDto,
  ): Promise<Responsible> {
    try {
      return await this.responsiblesService.create(createResponsibleDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResponsibleDto: UpdateResponsibleDto,
  ): Promise<Responsible> {
    try {
      return await this.responsiblesService.update(+id, updateResponsibleDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Responsible> {
    try {
      const responsible_ = await this.responsiblesService.remove(+id);
      if (!responsible_)
        throw new HttpException(
          'El responsable no existe',
          HttpStatus.NOT_FOUND,
        );
      return responsible_;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
