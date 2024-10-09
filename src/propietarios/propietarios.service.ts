import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePropietarioDto } from './dto/create-propietario.dto';
import { UpdatePropietarioDto } from './dto/update-propietario.dto';
import { Repository } from 'typeorm';
import { Propietarios } from './entities/propietario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalConfig } from 'config/Global_Config';

@Injectable()
export class PropietariosService {

  
  constructor(@InjectRepository(Propietarios) private propietariosRepository: Repository<Propietarios>,
  // private configService:ConfigService
  /* , 
  @InjectRepository(Estatus) private estatusRepository: Repository<Estatus> */ ){}

  

   config = GlobalConfig.getInstance();
   estatus_array = this.config.get('ESTATUS');

   busqueda_estatus(){

    if(this.estatus_array.includes('Activo')){
      const estatus = this.estatus_array.indexOf('Activo');
      return this.estatus_array[estatus];

    }else{
      return false
    }
  }

  async busqueda_propietario(id: number): Promise<any>{
      try{
        let busqueda = await this.propietariosRepository.findOne({
          where: {
            propietarios_id: id
          }
         })
  
         if(!busqueda){
          return false;
         }

         return busqueda;
      }catch(error){
        return new HttpException('Error al buscar', error)
      }
       
  }


  async create(create_propietario: CreatePropietarioDto) {
    

    const busqueda = this.busqueda_estatus()

    if(!busqueda){
      return new HttpException('Estatus "Activo" no existe', HttpStatus.NOT_FOUND);
    }


    /* return busqueda; */

    try{
      const nuevo_propietario = this.propietariosRepository.create({
        base_datos: create_propietario.base_datos,
        telefono: create_propietario.telefono,
        imagen_corporativa: create_propietario.imagen_corporativa,
        correo_propietario: create_propietario.correo_propietario,
        nombre: create_propietario.nombre,
        estatus: busqueda
      })
      this.propietariosRepository.save(nuevo_propietario);
      return {message: 'Propietario creado', status: HttpStatus.CREATED, data: {nuevo_propietario}}

    }catch(error){
      /* return new HttpException('Algo salió mal al crear', error) */
      return new HttpException('Algo salió mal al crear', error.message)
    }
  }

  async findAll() {
    try{
      return await this.propietariosRepository.find();
    }catch(error){
      return new HttpException('Algo salió mal al buscar', error)
    }
  }

  async findOne(id: number) {
    try{

      let busqueda_propietarios = await this.busqueda_propietario(id)

      if(!busqueda_propietarios){
        return new HttpException('No hay propietarios con ese ID', HttpStatus.NOT_FOUND);
      }

      return {message: 'Propietario encontrado', status: HttpStatus.FOUND, data: {busqueda_propietarios}}

    }catch(error){
      return new HttpException('Algo salió mal al buscar', error)
    }
  }

  async update(id: number, update_propietario: UpdatePropietarioDto) {

    /* const {estatus_id, ...propietario_sin_id} = update_propietario
 */
    let busqueda_propietarios = await this.busqueda_propietario(id)

    if(!busqueda_propietarios){
      return new HttpException('no hay propietarios con ese id', HttpStatus.NOT_FOUND);
    }

    try{

      const busqueda = this.busqueda_estatus() 

      if(!busqueda){
        return new HttpException('No existe el estatus "Activo"', HttpStatus.NOT_FOUND);
      }


      const updated = this.propietariosRepository.update({propietarios_id: id}, update_propietario)
      return {message: 'Propietario actualizado', status: HttpStatus.ACCEPTED} 

    

    /* return this.propietariosRepository.update({propietarios_id: id}, propietario_sin_id) */

    }catch(error){
      return new HttpException('Algo salió mal al actualizar', error)
    }
  }

  async remove(id: number) {
    
    try{
      let busqueda = await this.busqueda_propietario(id)

    if(!busqueda){
      return new HttpException("No existe un usuario con ese ID", HttpStatus.NOT_FOUND)
    }

    if(this.estatus_array.includes('Inactivo')){

      await this.propietariosRepository.update({propietarios_id: id}, {estatus: 'Inactivo'})

      return {message: 'Propietario eliminado', status: HttpStatus.ACCEPTED}

    }else{

      return new HttpException("No existe el estatus 'Inactivo' ", HttpStatus.NOT_FOUND)
    }

    /* return this.propietariosRepository.delete({propietarios_id: id}); */

    }catch(error){
      return new HttpException('Algo salió mal al eliminar', error)
    }
  }
}
