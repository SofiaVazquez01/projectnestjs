import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { GlobalConfig } from 'config/Global_Config';
// import { ConfigService } from '@nestjs/config';


@Injectable()
export class GruposService {
  private readonly estatusArray: string[];

  constructor(
    @InjectRepository(Grupo)
    private readonly gruposRepository: Repository<Grupo>,
    // private readonly configService: ConfigService
  ) {
    const config = GlobalConfig.getInstance();
    this.estatusArray = config.get('ESTATUS');
  }

  async create(createGrupoDto: CreateGrupoDto): Promise<{ grupo: Grupo; message: string }> {
    await this.verifyGrupoNecesario(createGrupoDto.grupo_necesario);
    
    if (!this.estatusArray.includes('Activo')) {
      throw new BadRequestException('El estatus "Activo" no está definido en las configuraciones');
    }

    const nuevoGrupo = this.gruposRepository.create({
      nombre: createGrupoDto.nombre,
      grupo_necesario: createGrupoDto.grupo_necesario,
      estatus: this.estatusArray[0],
    });

    const savedGrupo = await this.gruposRepository.save(nuevoGrupo);
    
    return { 
      grupo: savedGrupo, 
      message: `Grupo creado exitosamente con ID ${savedGrupo.grupo_id}` 
    };
  }

  async find_all(): Promise<{ data: Grupo[]; message: string }> {
    const data = await this.gruposRepository.find();
    const treeGrupos = this.buildTree(data);
    return { 
      data: treeGrupos, 
      message: `Se encontraron ${treeGrupos.length} grupos en total` 
    };
  }

  async find_one(id: number): Promise<{ grupo: Grupo; message: string }> {
    const grupo = await this.gruposRepository.findOne({ where: { grupo_id: id } });
    if (!grupo) {
      throw new NotFoundException(`Grupo con ID ${id} no encontrado`);
    }
    const allGrupos = await this.gruposRepository.find();
    const treeGrupo = this.buildTree(allGrupos).find(g => g.grupo_id === id);
    return { 
      grupo: treeGrupo || grupo, 
      message: `Grupo con ID ${id} encontrado exitosamente` 
    };
  }

  async update(id: number, updateGrupoDto: UpdateGrupoDto): Promise<{ grupo: Grupo; message: string }> {
    await this.verifyGrupoNecesario(updateGrupoDto.grupo_necesario);
    
    if (!this.estatusArray.includes('Activo')) {
      throw new BadRequestException('El estatus "Activo" no está definido en las configuraciones');
    }
  
    const grupoToUpdate = await this.gruposRepository.findOne({ where: { grupo_id: id } });
    if (!grupoToUpdate) {
      throw new NotFoundException(`Grupo con ID ${id} no encontrado`);
    }
  
    const updatedGrupo = this.gruposRepository.create({
      ...grupoToUpdate,
      ...updateGrupoDto,
      estatus: this.estatusArray[0],
    });
  
    await this.gruposRepository.save(updatedGrupo);
    
    return { 
      grupo: updatedGrupo, 
      message: `Grupo con ID ${id} actualizado exitosamente` 
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.gruposRepository.delete({ grupo_id: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Grupo con ID ${id} no encontrado`);
    }
    return { message: `Grupo con ID ${id} eliminado exitosamente` };
  }

  private async verifyGrupoNecesario(grupoNecesarioId: number | null): Promise<void> {
    if (grupoNecesarioId) {
      const grupoNecesario = await this.gruposRepository.findOne({
        where: { grupo_id: grupoNecesarioId }
      });
      if (!grupoNecesario) {
        throw new BadRequestException(`El grupo necesario con ID ${grupoNecesarioId} no existe`);
      }
    }
  }

  private buildTree(grupos: Grupo[]): Grupo[] {
    const map = new Map<number, Grupo & { hijo: Grupo[] }>();
    const rootNodes: (Grupo & { hijo: Grupo[] })[] = [];
    
    grupos.forEach(grupo => {
      map.set(grupo.grupo_id, { ...grupo, hijo: [] });
    });

    grupos.forEach(grupo => {
      const node = map.get(grupo.grupo_id);
      if (grupo.grupo_necesario) {
        const parentId = Number(grupo.grupo_necesario);
        const parent = map.get(parentId);
        if (parent) {
          parent.hijo.push(node);
        } else {
          console.warn(`Padre con ID ${parentId} no encontrado para el grupo ${grupo.grupo_id}`);
          rootNodes.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  }
}