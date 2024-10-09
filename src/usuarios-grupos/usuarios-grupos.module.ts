import { Module } from '@nestjs/common';
import { UsuariosGruposService } from './usuarios-grupos.service';
import { UsuariosGruposController } from './usuarios-grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosGrupo } from './entities/usuarios-grupo.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { GruposModule } from 'src/grupos/grupos.module';


@Module({
  imports:[TypeOrmModule.forFeature([UsuariosGrupo]),UsuariosModule,GruposModule
],
  controllers: [UsuariosGruposController],
  providers: [UsuariosGruposService],
  exports:[UsuariosGruposService]
})
export class UsuariosGruposModule {}
