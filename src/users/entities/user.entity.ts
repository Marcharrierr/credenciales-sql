import { Role } from "../../common/enums/rol.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('agent')
export class User {

    //@PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true, nullable: true })
    rut: string;

    @Column({ nullable: true })
    dv: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    // @Column({ type: 'enum', default: Role.USER, enum: Role })
    // role: string;

    @Column({ default: 'ACTIVO' })
    status: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


    // @Column({ unique: true, nullable: true })
    // rutEmpresa: string;

    // @Column({ nullable: true })
    // dvEmpresa: string;

}
