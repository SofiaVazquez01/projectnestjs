import { Controller, Get, Post, Body, Patch, Param, Delete,HttpException,HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      if(!createUsuarioDto.nombre){
        throw new HttpException('Name is Required',HttpStatus.BAD_REQUEST);
      }else{
        if(!createUsuarioDto.password){
          throw new HttpException('Password is required',HttpStatus.BAD_REQUEST);
        }
      }
      return this.usuariosService.create(createUsuarioDto);
    } catch (error) {
      throw new HttpException('Error creating user',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    try {
      return this.usuariosService.findAll();
    } catch (error) {
      throw new HttpException('Error fetching users',HttpStatus.INTERNAL_SERVER_ERROR);
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usuariosService.findOne(+id);
    } catch (error) {
      throw new HttpException('Error fetching user',HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try {
      if(!updateUsuarioDto.nombre){
        throw new HttpException('Name is Required',HttpStatus.BAD_REQUEST);
      }else{
        if(!updateUsuarioDto.password){
          throw new HttpException('Password is required',HttpStatus.BAD_REQUEST);
        }
      }
    return this.usuariosService.update(+id, updateUsuarioDto);
  } catch (error) {
    throw new HttpException('Error updating user',HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usuariosService.remove(+id);
    } catch (error) {
      throw new HttpException('Error deleting user',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
