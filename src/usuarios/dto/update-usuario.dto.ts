import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    nombre?: string;
    estacion_id?: number;
    password?: string;
    alias?:string;
    correo?:string;
    created_at: Date;
    updated_at: Date;
    estatus?: string;
    sistema_id?: number;
    propietario_id?: number;
    estatus_id?: number;
    
}
