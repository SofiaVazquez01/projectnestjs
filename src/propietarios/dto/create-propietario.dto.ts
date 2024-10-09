import { IsInt, IsString } from "class-validator";

export class CreatePropietarioDto {
    @IsString()
    base_datos: string;

    @IsInt()
    telefono: number;

    @IsString()
    imagen_corporativa: string;

    @IsString()
    correo_propietario: string;

    @IsString()
    nombre: string;
    
}
