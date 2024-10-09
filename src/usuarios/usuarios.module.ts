import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosGrupo } from 'src/usuarios-grupos/entities/usuarios-grupo.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Usuario,UsuariosGrupo])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports:[TypeOrmModule]
})
export class UsuariosModule {}
