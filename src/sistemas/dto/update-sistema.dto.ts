import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaDto } from './create-sistema.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateSistemaDto extends PartialType(CreateSistemaDto) {
    @IsInt()
    @IsOptional()
    sistema_id?: number;

    @IsOptional()
    nombre_sistema?: string;

    @IsOptional()
    estatus?: string;
    
}
