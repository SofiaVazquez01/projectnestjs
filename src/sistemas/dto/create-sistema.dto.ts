import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateSistemaDto {
    // @IsInt()
    // sistema_id:number;

    @IsString()
    nombre_sistema:string;

    // @IsString()
    // @IsOptional()
    // estatus:string;
}
