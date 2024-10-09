import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator"

export class CreateUsuarioDto {
    @IsString()
    nombre:string;

    @IsString()
    alias:string;

    @IsInt()
    estacion_id:number;

    @IsString()
    password:string;

    @IsString()
    correo:string;

    @IsOptional()
    @IsDate()
    created_at:Date;

    @IsOptional()
    @IsDate()
    updated_at:Date;


    @IsInt()
    sistema_id:number;

    @IsInt()
    propietario_id:number;

    @IsInt()
    estatus_id:number;

    @IsInt()
    @IsOptional()
    usuario_id:number;

 
}
