import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateGrupoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  grupo_necesario?: number;
}