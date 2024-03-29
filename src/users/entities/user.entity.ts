import { Role } from "../../common/enums/rol.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('agent')
export class User {

    //@PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ unique: true, nullable: true })
    rut: string;

    @Column({ nullable: true })
    dv: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    // @Column({ type: 'enum', default: Role.USER, enum: Role })
    // role: string;

    @Column({ default: 'ACTIVO' })
    status: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    modified: Date;

    @Column()
    client_id: number;

}
