import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemasGrupoDto } from './create-sistemas-grupo.dto';
import { IsInt, IsOptional } from 'class-validator';


export class UpdateSistemasGrupoDto extends PartialType(CreateSistemasGrupoDto) {
    @IsInt()
    @IsOptional()
    sistemas_id:number;

    @IsInt()
    @IsOptional()
    grupos_id?: number;
    
}
