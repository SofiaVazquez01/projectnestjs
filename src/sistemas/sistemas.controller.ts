import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SistemasService } from './sistemas.service';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { throwIfEmpty } from 'rxjs';

@Controller('sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @Post()
  create(@Body() createSistemaDto: CreateSistemaDto) {
    try {
      
      return this.sistemasService.create(createSistemaDto);
    } catch (error) {
      throw new HttpException(`Error al crear el sistema:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.sistemasService.findAll();
    } catch (error) {
      throw new HttpException(`Èrror al traer los sistemas:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':sistema_id')
  async findOne(@Param('sistema_id') id: string) {
    try {
      return this.sistemasService.findOne(+id);
    } catch (error) {
      throw new HttpException(`Error no se encuentra el sistema:${error.message}`,HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':sistema_id')
  async update(@Param('sistema_id') id: string, @Body() updateSistemaDto: UpdateSistemaDto) {
    try {
      return this.sistemasService.update(+id, updateSistemaDto);
    } catch (error) {
      throw new HttpException('No se actualizo la información',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':sistema_id')
  remove(@Param('sistema_id') id: string) {
    try {
      return this.sistemasService.remove(+id);
    } catch (error) {
      throw new HttpException('Error eliminando el sistema',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
