import { IsInt } from "class-validator";

export class CreateSistemasGrupoDto {
    @IsInt()
    sistemas_id:number;
    
    @IsInt()
    grupos_id:number;
}
