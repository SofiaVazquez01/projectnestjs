import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { Sistema } from './entities/sistema.entity';
import { Repository } from 'typeorm';

import { GlobalConfig } from 'config/Global_Config';

@Injectable()
export class SistemasService {
  constructor(@InjectRepository(Sistema) private sistemaRepository:Repository<Sistema>,
          //private configService:ConfigService
          ){}
  async create(sistema: CreateSistemaDto) {
    try {
      const config = GlobalConfig.getInstance();
      const estatus = config.get('ESTATUS');
      // const estatus_json = this.configService.get<string>('ESTATUS');
      // const estatus_array = JSON.parse(estatus);

      const user_found = await this.sistemaRepository.findOne({
        where:{
          nombre_sistema:sistema.nombre_sistema
        }
      })
      if(user_found){
        return new HttpException('Ya existe el sistema',HttpStatus.CONFLICT);
      }
      if(estatus[0] == "Activo"){
        const data = {
          estatus:estatus[0],
        }

        const sistema_data = {...data,...sistema}
        const new_data_sistem = this.sistemaRepository.create(sistema_data);
        const new_sistem = this.sistemaRepository.save(new_data_sistem);
        return {message:`Sistema creado con éxito`,data:{new_sistem}}; 
      }else{
        throw new HttpException(`El estatus "Activo" no esta definido en las confirguracions`,HttpStatus.BAD_REQUEST);
      }
      // return 'This action adds a new sistema';
    } catch (error) {
      throw new HttpException(`Error al crear sistema:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      const usuarios_grupos = await this.sistemaRepository.find({where:{estatus:'Activo'}});
      return {message:`Datos traidos con éxito`,data:{usuarios_grupos}};
    } catch (error) {
      throw new HttpException(`Error al traer datos:${error.message}`,HttpStatus.NOT_FOUND);
    }
    // return `This action returns all sistemas`;
  }

  async findOne(id: number) {
    try {
      const sistem_found = await this.sistemaRepository.findOne({
        where:{sistema_id:id,estatus:'Activo'},
      })
      if(!sistem_found){
        return new HttpException(`Sistema no encontrado`,HttpStatus.NOT_FOUND);
      }
      return {message:`Sistema #${id} encontrado con éxito`,data:{sistem_found}};
    } catch (error) {
      throw new HttpException(`Error al buscar sistema:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // return `This action returns a #${id} sistema`;
  }

  async update(id: number, sistema: UpdateSistemaDto) {
    try {
      const sistem_found = this.sistemaRepository.findOne({
        where:{sistema_id:id}
      })
      if(!sistem_found){return new HttpException('Sistema no encontrado',HttpStatus.NOT_FOUND)}
      const usuarios_grupos = await this.sistemaRepository.update({sistema_id:id},sistema);
      return {message:`Sistemas actualizados con éxito`,data:{usuarios_grupos}};
    } catch (error) {
      throw new HttpException(`Error actualizando el sistema:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // return `This action updates a #${id} sistema`;
  }

  async remove(sistema_id: number) {
    try {
      // const estatus_json = this.configService.get<string>('ESTATUS');
      // const estatus_array = JSON.parse(estatus_json);
      const config = GlobalConfig.getInstance();
      const estatus = config.get('ESTATUS');
      
      if(estatus[1] == 'Inactivo'){
        const actualizacion = await this.sistemaRepository.update({sistema_id},{estatus:estatus[1]});
        if(actualizacion.affected ===0){
          return new HttpException('No existe el sistema',HttpStatus.NOT_FOUND);
        }

        const sistema_actualizado = await this.sistemaRepository.findOne({ where:{sistema_id}});
        return {message:`Sistema eliminado con éxito`,data:{sistema_actualizado}};
      }else{
        throw new HttpException(`El estatus "Inactivo" no esta definido en las confirguracions`,HttpStatus.BAD_REQUEST);
      }
      
    } catch (error) {
      if(error instanceof HttpException){ throw error;}
      throw new HttpException(`Error al eliminar un sitema:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // return `This action removes a #${id} sistema`;
  }
}
