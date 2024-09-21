import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    nombre?: string;
    estacion_id_?: number;
    password?: string;
    alias?:string;
    correo?:string;
    created_at?: Date;
    updated_at?: Date;
    estatus?: boolean;
    sistema_id?: number;
    propietario_id?: number;
    estatus_id?: number;
}
