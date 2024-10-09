import { SistemasGrupo } from "src/sistemas-grupos/entities/sistemas-grupo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'sistemas',schema:'privilegios'})
export class Sistema {
     @PrimaryGeneratedColumn()
     sistema_id:number;

     @Column({type:'character varying'})
     nombre_sistema:string;

     @Column({type:'character varying'})
     estatus:string;

     @OneToMany(()=> SistemasGrupo,sistemasGrupo => sistemasGrupo.sistema)
     sistemasGrupos: SistemasGrupo[];
     
}
