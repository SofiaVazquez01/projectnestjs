import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosGruposService } from './usuarios-grupos.service';
import { CreateUsuariosGrupoDto } from './dto/create-usuarios-grupo.dto';
import { UpdateUsuariosGrupoDto } from './dto/update-usuarios-grupo.dto';

@Controller('usuarios-grupos')
export class UsuariosGruposController {
  constructor(private readonly usuariosGruposService: UsuariosGruposService) {}

  @Post()
  create(@Body() createUsuariosGrupoDto: CreateUsuariosGrupoDto) {
    try {
      
      return this.usuariosGruposService.create(createUsuariosGrupoDto);
    } catch (error) {
      throw new HttpException('Error al hacer la relacion',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  async findAll() {
    return this.usuariosGruposService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuariosGruposService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuariosGrupoDto: UpdateUsuariosGrupoDto) {
    return this.usuariosGruposService.update(+id, updateUsuariosGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosGruposService.remove(+id);
  }
}
