import { IsInt} from "class-validator";

export class CreateUsuariosGrupoDto {
    @IsInt()
    usuarios_id:number;

    
    @IsInt()
    grupos_id:number;

}
