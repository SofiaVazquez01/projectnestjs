import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
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
        throw new HttpException('El nombre es requerido',HttpStatus.BAD_REQUEST);
      }else{
        if(!createUsuarioDto.password){
          throw new HttpException('El password es requerido',HttpStatus.BAD_REQUEST);
        }
      }
      return this.usuariosService.create(createUsuarioDto);
    } catch (error) {
      throw new HttpException('Error al crear usuario',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.usuariosService.findAll();
    } catch (error) {
      throw new HttpException('Error al traer datos',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':usuario_id')
  async findOne(@Param('usuario_id') usuario_id: string) {
    try {
      
      const result = await this.usuariosService.findOne(+usuario_id);
      if(result instanceof HttpException){ throw result;}
      return result;
    } catch (error) {
      if(error instanceof HttpException){ throw error;}
      throw new HttpException('Error no se encuentra el usuario',HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':usuario_id')
  async update(@Param('usuario_id') usuario_id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try {
        // if(!updateUsuarioDto.nombre){
        //   throw new HttpException('Name is Required',HttpStatus.BAD_REQUEST);
        // }
          // if(!updateUsuarioDto.password){
          //   throw new HttpException('Password is required',HttpStatus.BAD_REQUEST);
          // }
          // console.log('updateUsuarioDto:',updateUsuarioDto);
          // console.log('usuario_id',usuario_id);
        
      return this.usuariosService.update(+usuario_id, updateUsuarioDto);
    } catch (error) {
      throw new HttpException('No se actualizo la información',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':usuario_id')
  remove(@Param('usuario_id') id: string) {
    try {
      return this.usuariosService.remove(+id);
    } catch (error) {
      throw new HttpException('Error eliminando al usuario',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
