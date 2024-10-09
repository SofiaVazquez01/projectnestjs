import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGrupoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  grupo_necesario?: number;
  
}