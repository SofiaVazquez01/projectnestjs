import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';

import { Grupo } from './entities/grupo.entity';
import { UsuariosGrupo } from 'src/usuarios-grupos/entities/usuarios-grupo.entity';
import { SistemasGrupo } from 'src/sistemas-grupos/entities/sistemas-grupo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo,UsuariosGrupo,SistemasGrupo])],
  controllers: [GruposController],
  providers: [GruposService],
  exports:[TypeOrmModule]
})
export class GruposModule {}