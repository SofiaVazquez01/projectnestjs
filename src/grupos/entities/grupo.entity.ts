import { SistemasGrupo } from "src/sistemas-grupos/entities/sistemas-grupo.entity";
import { UsuariosGrupo } from "src/usuarios-grupos/entities/usuarios-grupo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    schema:'privilegios',
    name:'grupos',
})
export class Grupo {
    @PrimaryGeneratedColumn()
    grupo_id: number;

    @Column({
        type: 'varchar',
    })
    nombre: string;

    @Column({
      
    })
    grupo_necesario: number;

    @Column({
        type: 'varchar',
    })
    estatus: string;

    @OneToMany(()=>UsuariosGrupo,usuariosGrupo =>usuariosGrupo.grupo)
    usuariosGrupo:UsuariosGrupo[];

    @OneToMany(()=> SistemasGrupo,sistemasGrupo => sistemasGrupo.sistema)
     sistemasGrupos: SistemasGrupo[];
}