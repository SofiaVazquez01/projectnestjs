import { PartialType } from '@nestjs/mapped-types';
import { CreatePropietarioDto } from './create-propietario.dto';

export class UpdatePropietarioDto extends PartialType(CreatePropietarioDto) {

    base_datos ?: string;
    telefono ?: number;
    imagen_corporativa ?: string;
    correo_propietario ?: string;
    nombre ?: string;
    
                                                                                                        

}
