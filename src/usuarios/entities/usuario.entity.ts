import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"   
@Entity({name:'usuarios',schema:'usuarios'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    nombre:string;

    @Column({type:'character varying'})
    alias:string;

    @Column({type:'character varying'})
    correo:string;

    @Column({type:'boolean'})
    estatus:boolean;

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
}
