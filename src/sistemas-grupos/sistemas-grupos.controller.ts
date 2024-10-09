import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SistemasGruposService } from './sistemas-grupos.service';
import { CreateSistemasGrupoDto } from './dto/create-sistemas-grupo.dto';
import { UpdateSistemasGrupoDto } from './dto/update-sistemas-grupo.dto';

@Controller('sistemas-grupos')
export class SistemasGruposController {
  constructor(private readonly sistemasGruposService: SistemasGruposService) {}

  @Post()
  create(@Body() createSistemasGrupoDto: CreateSistemasGrupoDto) {
    return this.sistemasGruposService.create(createSistemasGrupoDto);
  }

  @Get()
   async findAll() {
    return this.sistemasGruposService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sistemasGruposService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSistemasGrupoDto: UpdateSistemasGrupoDto) {
    return this.sistemasGruposService.update(+id, updateSistemasGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sistemasGruposService.remove(+id);
  }
}
