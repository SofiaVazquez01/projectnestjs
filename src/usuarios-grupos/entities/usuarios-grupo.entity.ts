import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';

@Entity({name:'usuarios_grupos',schema:'usuarios'})
export class UsuariosGrupo {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"integer"})
    usuarios_id:number

    @Column({type:"integer"})
    grupos_id:number;

    @ManyToOne(() => Usuario, usuario => usuario.usuariosGrupos)
    @JoinColumn({ name: 'usuarios_id' }) // Hace referencia a la columna 'usuarios_id' en la base de datos
    usuario: Usuario;

   @ManyToOne(() => Grupo, grupo =>grupo.usuariosGrupo)
   @JoinColumn({name:'grupos_id'})
   grupo:Grupo;

}
