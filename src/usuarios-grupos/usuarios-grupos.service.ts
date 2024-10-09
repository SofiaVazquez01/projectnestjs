import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuariosGrupoDto } from './dto/create-usuarios-grupo.dto';
import { UpdateUsuariosGrupoDto } from './dto/update-usuarios-grupo.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosGrupo } from './entities/usuarios-grupo.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';

@Injectable()
export class UsuariosGruposService {
  constructor(
    @InjectRepository(UsuariosGrupo) private usuariosGrupoRepository:Repository<UsuariosGrupo>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Grupo) private gruposRepository: Repository<Grupo>,
    
  ){}

  async create(usuariosgrupo: CreateUsuariosGrupoDto) {
   
    try {
      const { usuarios_id, grupos_id } = usuariosgrupo;
    const user_found =  await this.usuariosRepository.findOne({where:{  usuario_id:usuarios_id,estatus:'Activo'}});
    
    if(!user_found){
      return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)
    }
    const group_found = await this.gruposRepository.findOne({where:{grupo_id:grupos_id,estatus:'Activo'}});

    if(!group_found){
      return new HttpException('Grupo no encontrado',HttpStatus.NOT_FOUND);
    }
    const usuario_grupo = new UsuariosGrupo();
    usuario_grupo.grupo = group_found;
    usuario_grupo.grupos_id=grupos_id;
    usuario_grupo.usuarios_id = usuarios_id;
    usuario_grupo.usuario = user_found;
    // const usuario_grupo = this.UsuariosGrupoRepository.create({...usuariosgrupo,
    //   usuario:user_found
    // });
   
    const savedUsuarioGrupo = await this.usuariosGrupoRepository.save(usuario_grupo);
      
  
    return {message:'Grupos asociados correctamente al usuario',data:{savedUsuarioGrupo}};
    } catch (error) {
      throw new HttpException(`Error al hacer la relación: ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
  }

  async findAll() {
    try {
      const usuarios_grupos = await this.usuariosGrupoRepository.find();
      return {message:`Usuario-grupo encontrado con éxito`,data:{usuarios_grupos}};
    } catch (error) {
      throw new HttpException(`Error al traer datos:${error.message}`,HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number) {
    try {
      const usuarios_grupos_found = await this.usuariosGrupoRepository.findOne({
        where:{id:id}
      })
      if(!usuarios_grupos_found){
        return new HttpException(`Relacion no encontrada`,HttpStatus.NOT_FOUND);
      }
      return {message:`Relacion #${id} encontrada con éxito`,data:{usuarios_grupos_found}}
      
    } catch (error) {
      throw new HttpException(`Error al buscar la relación:${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, usuariosgrupos: UpdateUsuariosGrupoDto) {
    try {
      const usuariosgrupos_found = this.usuariosGrupoRepository.findOne({
        where:{id:id}
      })
      if(!usuariosgrupos_found){
        return new HttpException(`Relacion no encontrada`,HttpStatus.NOT_FOUND)
      }
      const usuarios_grupos = this.usuariosGrupoRepository.update({id},usuariosgrupos)
      return {message:`Relacion #${id} actualizada con éxito`,data:{usuarios_grupos}};
    } catch (error) {
      throw new HttpException(`Error actualizando la relación ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} usuariosGrupo`;
  }
}
