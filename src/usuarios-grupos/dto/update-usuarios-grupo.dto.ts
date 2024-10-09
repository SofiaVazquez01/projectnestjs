import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosGrupoDto } from './create-usuarios-grupo.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateUsuariosGrupoDto extends PartialType(CreateUsuariosGrupoDto) {
    @IsInt()
    @IsOptional()
    usuarios_id:number;

    
    @IsInt()
    @IsOptional()
    grupos_id:number;

    
}
