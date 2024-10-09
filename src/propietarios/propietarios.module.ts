import { Module } from '@nestjs/common';
import { PropietariosService } from './propietarios.service';
import { PropietariosController } from './propietarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propietarios } from './entities/propietario.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Propietarios])],
  controllers: [PropietariosController],
  providers: [PropietariosService],
})
export class PropietariosModule {}
