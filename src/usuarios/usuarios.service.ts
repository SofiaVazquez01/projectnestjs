import { UsuariosGruposService } from './../usuarios-grupos/usuarios-grupos.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {Usuario} from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ReturnDocument } from 'typeorm';
import { encryptBcrypt } from 'src/plugins/bcrypt';

import { GlobalConfig } from 'config/Global_Config';






@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepository:Repository<Usuario>,
   
  ){}

  async create(usuario: CreateUsuarioDto) {
    try {
      const config = GlobalConfig.getInstance();
      const estatus = config.get('ESTATUS');
      if(estatus.includes('Activo')){ 

        const Data_usuario = {
          password:encryptBcrypt(usuario.password),
          created_at: new Date(),
          updated_at: new Date(),
          estatus:estatus[0]
          
        }
        const user_found = await this.usuariosRepository.findOne({
          where:{
            nombre:usuario.nombre
          }
        })
        if(user_found){
          return new HttpException('Ya existe el usuario',HttpStatus.CONFLICT);
        }
        const usuario_data = {...usuario,...Data_usuario};
        const new_usuario = this.usuariosRepository.create(usuario_data);
        const saved_usuario = await this.usuariosRepository.save(new_usuario);
        
        
        
        return {message:`Usuario creado con éxito`,data:{saved_usuario }};
        
      }else{
        throw new HttpException(`El estatus "Activo" no esta definido en las confirguracions`,HttpStatus.BAD_REQUEST);
      }

      // return 'This action adds a new usuario';
    } catch (error) {
      throw new HttpException(`Error al crear usuario:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      
      const usuarios = await this.usuariosRepository.find({
        select:{
          usuario_id:true,
          nombre:true,
          alias:true,
          correo:true,
          estatus:true,
          estacion_id:true,
          sistema_id:true,
          propietario_id:true,
          estatus_id:true,
        },
        where:{estatus:'Activo'},
        order:{usuario_id:'ASC'}
      });
      return {message:`Usuarios traidos con éxito`,data:{usuarios}}
      
    } catch (error) {
      throw new HttpException(`Error al traer datos:${error.message}`,HttpStatus.NOT_FOUND);
    }
  }

  async findOne(usuario_id: number) {
    try {
      //se mandan llamar casi todos los campos a excepción de password,created_at,updated_at
      const user_found = await this.usuariosRepository.findOne({
        select:{
          usuario_id:true,
          nombre:true,
          alias:true,
          correo:true,
          estatus:true,
          estacion_id:true,
          sistema_id:true,
          propietario_id:true,
          estatus_id:true
        },
        where:{usuario_id:usuario_id,estatus:'Activo'},
  
      })
      if(!user_found){return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)}
      return {message:`Usuario encontrado con éxito`,data:{user_found}};
      
    } catch (error) {
      throw new HttpException(`Error al buscar usuario:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, usuarios: UpdateUsuarioDto) {
    try {
      const config = GlobalConfig.getInstance();
      const estatus = config.get('ESTATUS');

      if(usuarios.password){

        const encrypt_password = await encryptBcrypt(usuarios.password);
        
        const Data_usuario = {
          password:encrypt_password,
          // created_at: new Date(),
          updated_at: new Date(),
          estatus: usuarios.estatus? estatus[0] : '',
        }
        
        const user_found = await this.usuariosRepository.findOne({
          where:{
            usuario_id:id
          }
        })
        if(!user_found){return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)}
        
        const data_update ={...usuarios,...Data_usuario};
        console.log(data_update,Data_usuario);
        const update_user = Object.assign(user_found,data_update);
        console.log(update_user);
        return this.usuariosRepository.save(update_user);
      }else{

        const user_found = await this.usuariosRepository.findOne({
          where:{
            usuario_id:id
          }
        })
        if(!user_found){return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)}
        usuarios.estatus = estatus[0];
        usuarios.updated_at = new Date();
        const usuarios_ = this.usuariosRepository.update({usuario_id:id},usuarios);
        return {message:`Usuario actualizado con éxito`,data:{usuarios_}};
      }
      // return `This action updates a #${id} usuario`;
    } catch (error) {
      throw new HttpException(`Error actualizando al usuario:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
      // return error;
    }
  }

  async remove(usuario_id: number) {
    try {
      const config = GlobalConfig.getInstance();
      const estatus = config.get('ESTATUS');

      if(estatus.includes('Inactivo')){

        const result = await this.usuariosRepository.update({usuario_id},{estatus:estatus[1]});
        if(result.affected ===0){
          return new HttpException('No existe el usuario',HttpStatus.NOT_FOUND);
        }
        
        return {message:`Usuario eliminado con éxito`,data:{result}};
      }else{
        throw new HttpException(`El estatus "Inactivo" no esta definido en las confirguracions`,HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Error al eliminar usuario:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}