import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateSistemaDto {
    

    @IsString()
    nombre_sistema:string;

    // @IsString()
    // @IsOptional()
    // estatus:string;
}
