import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposModule } from './grupos/grupos.module';
import { UsuariosGruposModule } from './usuarios-grupos/usuarios-grupos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PropietariosModule } from './propietarios/propietarios.module';
import { SistemasModule } from './sistemas/sistemas.module';
import { SistemasGruposModule } from './sistemas-grupos/sistemas-grupos.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      ssl: process.env.DB_SSLMODE === 'require' ? { rejectUnauthorized: false } : false,
    }),
    GruposModule,
    UsuariosGruposModule,
    UsuariosModule,
    PropietariosModule,
    SistemasModule,
    SistemasGruposModule,
    
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}