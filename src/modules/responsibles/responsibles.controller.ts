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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponsiblesService } from './responsibles.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { Responsible } from './entities/responsible.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('responsibles')
@Controller('responsibles')
export class ResponsiblesController {
  constructor(private readonly responsiblesService: ResponsiblesService) {}

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all responsibles' })
  @ApiResponse({ status: 200, description: 'Return all responsibles.' })
  @ApiResponse({ status: 404, description: 'No responsibles found.' })
  async findAll(): Promise<Responsible[]> {
    const responsiblesFound = await this.responsiblesService.findAll();

    if (!responsiblesFound || responsiblesFound.length === 0)
      throw new HttpException('No responsibles found', HttpStatus.NOT_FOUND);

    return responsiblesFound;
  }

  @Roles('ADMIN', 'GUIDE')
  @Get('guide/:idUser')
  @ApiOperation({ summary: 'Get all responsibles by guide ID' })
  @ApiResponse({
    status: 200,
    description: 'Return all responsibles for the guide.',
  })
  @ApiResponse({
    status: 404,
    description: 'No responsibles found for this guide.',
  })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async findAllByGuide(
    @Param('idUser') idUser: string,
  ): Promise<Responsible[]> {
    try {
      const responsiblesFound =
        await this.responsiblesService.findAllByGuide(+idUser);

      if (!responsiblesFound || responsiblesFound.length === 0)
        throw new HttpException(
          'No responsibles found for this guide',
          HttpStatus.NOT_FOUND,
        );

      return responsiblesFound;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get a responsible by ID' })
  @ApiResponse({ status: 200, description: 'Return the responsible.' })
  @ApiResponse({ status: 404, description: 'Responsible not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async findOne(@Param('id') id: string): Promise<Responsible> {
    try {
      const responsibleFound = await this.responsiblesService.findOne(+id);

      if (!responsibleFound)
        throw new HttpException('Responsible not found', HttpStatus.NOT_FOUND);

      return responsibleFound;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new responsible' })
  @ApiResponse({
    status: 201,
    description: 'The responsible has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() createResponsibleDto: CreateResponsibleDto,
  ): Promise<Responsible> {
    try {
      const createdResponsible =
        await this.responsiblesService.create(createResponsibleDto);

      if (!createdResponsible)
        throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);

      return createdResponsible;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Put(':id')
  @ApiOperation({ summary: 'Update a responsible by ID' })
  @ApiResponse({
    status: 200,
    description: 'The responsible has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Responsible not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updateResponsibleDto: UpdateResponsibleDto,
  ): Promise<Responsible> {
    try {
      const updatedResponsible = await this.responsiblesService.update(
        +id,
        updateResponsibleDto,
      );

      if (!updatedResponsible)
        throw new HttpException('Responsible not found', HttpStatus.NOT_FOUND);

      return updatedResponsible;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a responsible by ID' })
  @ApiResponse({
    status: 200,
    description: 'The responsible has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Responsible not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async remove(@Param('id') id: string): Promise<Responsible> {
    try {
      const removedResponsible = await this.responsiblesService.remove(+id);

      if (!removedResponsible)
        throw new HttpException('Responsible not found', HttpStatus.NOT_FOUND);

      return removedResponsible;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
