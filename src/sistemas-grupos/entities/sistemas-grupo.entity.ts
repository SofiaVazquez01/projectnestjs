import { Grupo } from "src/grupos/entities/grupo.entity";
import { Sistema } from "src/sistemas/entities/sistema.entity";
import { Column, Entity, JoinColumn,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";

 @Entity({name:'sistemas_grupos',schema:'privilegios'})
export class SistemasGrupo {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'integer'})
    sistemas_id:number;

    @Column({type:'integer'})
    grupos_id:number;

    @ManyToOne(() => Sistema, sistema => sistema.sistemasGrupos)
    @JoinColumn({name:'sistemas_id'})
    sistema: Sistema;

    @ManyToOne(() => Grupo, grupo =>grupo.sistemasGrupos)
   @JoinColumn({name:'grupos_id'})
   grupo:Grupo;
}
