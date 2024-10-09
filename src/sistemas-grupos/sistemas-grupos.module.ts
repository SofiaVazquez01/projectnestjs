import { Module } from '@nestjs/common';
import { SistemasGruposService } from './sistemas-grupos.service';
import { SistemasGruposController } from './sistemas-grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SistemasGrupo } from './entities/sistemas-grupo.entity';
import { SistemasModule } from 'src/sistemas/sistemas.module';
import { GruposModule } from 'src/grupos/grupos.module';

@Module({
  imports:[TypeOrmModule.forFeature([SistemasGrupo]),SistemasModule,GruposModule],
  controllers: [SistemasGruposController],
  providers: [SistemasGruposService],
  exports:[SistemasGruposService]
})

export class SistemasGruposModule {}
