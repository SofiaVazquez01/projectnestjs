import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropietariosService } from './propietarios.service';
import { CreatePropietarioDto } from './dto/create-propietario.dto';
import { UpdatePropietarioDto } from './dto/update-propietario.dto';

@Controller('propietarios')
export class PropietariosController {
  constructor(private readonly propietariosService: PropietariosService) {}

  @Post()
  create(@Body() createPropietarioDto: CreatePropietarioDto) {
    return this.propietariosService.create(createPropietarioDto);
  }

  @Get()
  findAll() {
    return this.propietariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propietariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropietarioDto: UpdatePropietarioDto) {
    return this.propietariosService.update(+id, updatePropietarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propietariosService.remove(+id);
  }
}
