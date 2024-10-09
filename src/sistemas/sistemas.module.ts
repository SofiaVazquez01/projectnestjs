import { Module } from '@nestjs/common';
import { SistemasService } from './sistemas.service';
import { SistemasController } from './sistemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sistema } from './entities/sistema.entity';
import { SistemasGrupo } from 'src/sistemas-grupos/entities/sistemas-grupo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sistema,SistemasGrupo])],
  controllers: [SistemasController],
  providers: [SistemasService],
  exports:[TypeOrmModule]
})
export class SistemasModule {}
