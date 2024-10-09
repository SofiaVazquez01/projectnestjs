import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSistemasGrupoDto } from './dto/create-sistemas-grupo.dto';
import { UpdateSistemasGrupoDto } from './dto/update-sistemas-grupo.dto';
import { Sistema } from 'src/sistemas/entities/sistema.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';
import { SistemasGrupo } from './entities/sistemas-grupo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SistemasGruposService {
  constructor(
    @InjectRepository(SistemasGrupo) private sistemasGrupoRepository:Repository<SistemasGrupo>,
    @InjectRepository(Sistema) private sistemasRepository: Repository<Sistema>,
    @InjectRepository(Grupo) private gruposRepository: Repository<Grupo>,
  ){}
  async create(sistemasgrupos: CreateSistemasGrupoDto) {
    try {
      const {sistemas_id, grupos_id} = sistemasgrupos;
      const sistem_found = await this.sistemasRepository.findOne({where:{sistema_id:sistemas_id,
        estatus:'Activo'
      }});

      if(!sistem_found){
        return new HttpException('Sistema no encontrado',HttpStatus.NOT_FOUND);
      }

      const group_found = await this.gruposRepository.findOne({where:{grupo_id:grupos_id,estatus:'Activo'}});
      if(!group_found){
        return new HttpException('Grupo no encontrado',HttpStatus.NOT_FOUND);
      }

      const sistema_grupo = new SistemasGrupo();
      sistema_grupo.sistema = sistem_found;
      sistema_grupo.sistemas_id = sistemas_id;
      sistema_grupo.grupo = group_found;
      sistema_grupo.grupos_id = grupos_id;

      const savedSistemaGrupo =  await this.sistemasGrupoRepository.save(sistema_grupo);
      return {message:'Grupos asociados orrectamente al Sistema',data:{savedSistemaGrupo}}
    } catch (error) {
      throw new HttpException(`Error al hacer la relación: ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // return 'This action adds a new sistemasGrupo';
  }

  async findAll() {
    try {
      const sistemas_grupos = await this.sistemasGrupoRepository.find();
      return {message:`Sistemas-Grupos encontrados con éxito`,data:{sistemas_grupos}}
    } catch (error) {
      throw new HttpException(`Error al traer datos:${error.message}`,HttpStatus.NOT_FOUND);
    }
    // return `This action returns all sistemasGrupos`;
  }

  async findOne(id: number) {
    try {
      //se realiza query para que busque desde el id del sistema y obtenga las relaciones asociadas con grupos 
      //cuando grupos tenga el estatus "Activo"
      const sistema = await this.sistemasRepository
      .createQueryBuilder('sistema')
      .leftJoinAndSelect('sistema.sistemasGrupos','sistemasGrupos')
      .leftJoinAndSelect('sistemasGrupos.grupo','grupo')
      .where('sistema.sistema_id = :id',{id})
      .andWhere('grupo.estatus = :estatus',{estatus: 'Activo'})
      .andWhere('sistema.estatus = :estatus',{estatus:'Activo'})
      .getOne();
      
      
      if(!sistema){
        return new HttpException(`No se encontro la relacion con el sistema id #${id}`,HttpStatus.NOT_FOUND);
      }
      
      return {message:`Relación del sistema #${id} con sus grupos encontrada con éxito`,data:{sistema}}
    } catch (error) {
      throw new HttpException(`Error al buscar la relación ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async update(id: number, sistemasgrupos: UpdateSistemasGrupoDto) {
    try {
      const sistemasgrupos_found = this.sistemasGrupoRepository.findOne({
        where:{id}
      })
      if(!sistemasgrupos_found){
        return new HttpException(`Relación no encontrada`,HttpStatus.NOT_FOUND);
      }
      const sistemas_grupos = await this.sistemasGrupoRepository.update({id},sistemasgrupos);
      return {message:`Relación #${id} actualizada con éxito`,data:{sistemas_grupos}};
    } catch (error) {
      throw new HttpException(`Error actualizando la relación ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} sistemasGrupo`;
  }
  
}
