import { UsuariosGrupo } from './../../usuarios-grupos/entities/usuarios-grupo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"   


@Entity({name:'usuarios',schema:'usuarios'})
export class Usuario {
    @PrimaryGeneratedColumn()
    usuario_id:number;

    @Column({unique: true})
    nombre:string;

    @Column({type:'character varying'})
    alias:string;

    @Column({type:'character varying'})
    correo:string;

    @Column({type:'character varying'})
    estatus:string;

    @Column({type:'integer'})
    estacion_id:number;

    @Column({type:'integer'})
    sistema_id:number;

    @Column({type:'character varying'})
    password:string;

    @Column({type:'integer'})
    propietario_id:number;

    @Column({type:'integer'})
    estatus_id:number;

    @Column({type:'timestamp without time zone'})
    created_at:Date;

    @Column({type:'timestamp without time zone'})
    updated_at:Date;

    @OneToMany(() => UsuariosGrupo, usuariosGrupo => usuariosGrupo.usuario) 
    usuariosGrupos: UsuariosGrupo[];
   
}
