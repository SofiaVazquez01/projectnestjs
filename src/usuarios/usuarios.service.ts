import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptBcrypt } from 'src/plugins/bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepository:Repository<Usuario>
  ){}

  async create(usuario: CreateUsuarioDto) {
    try {
      const Data_usuario = {
        password:encryptBcrypt(usuario.password),
        created_at: new Date(),
        updated_at: new Date(),
        estatus:true
      }
      const user_found = await this.usuariosRepository.findOne({
        where:{
          nombre:usuario.nombre
        }
      })
      if(user_found){
        return new HttpException('User already exist',HttpStatus.CONFLICT);
      }
      const usuario_data = {...usuario,...Data_usuario};
      const new_usuario = this.usuariosRepository.create(usuario_data);
      return this.usuariosRepository.save(new_usuario);
      // return 'This action adds a new usuario';
    } catch (error) {
      throw new HttpException('Error creating user',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    try {
      
      return this.usuariosRepository.find()
      // return `This action returns all usuarios`;
    } catch (error) {
      throw new HttpException('Error bringing users',HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number) {
    try {
      
      const user_found = await this.usuariosRepository.findOne({
        where:{id:id},
  
      })
      if(!user_found){return new HttpException('User not found',HttpStatus.NOT_FOUND)}
      return user_found;
      // return `This action returns a #${id} usuario`;
    } catch (error) {
      throw new HttpException('Error finding user',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, usuarios: UpdateUsuarioDto) {
    try {
      const encrypt_password = await encryptBcrypt(usuarios.password);
      const Data_usuario = {
        password:encrypt_password,
        // created_at: new Date(),
        updated_at: new Date(),
        estatus:true
      }
      const user_found = await this.usuariosRepository.findOne({
        where:{
          id
        }
      })
      if(!user_found){return new HttpException('User not found',HttpStatus.NOT_FOUND)}
  
      const data_update ={...usuarios,...Data_usuario};
      console.log(Data_usuario);
      const update_user = Object.assign(user_found,data_update);
      console.log(update_user);
      return this.usuariosRepository.save(user_found);
      // return `This action updates a #${id} usuario`;
    } catch (error) {
      throw new HttpException('Error updating user',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      
      const result = await this.usuariosRepository.delete({id});
      if(result.affected ===0){
        return new HttpException('User not found',HttpStatus.NOT_FOUND);
      }
      
      return `This action removes a #${id} usuario`;
    } catch (error) {
      throw new HttpException('Error deleting user',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
