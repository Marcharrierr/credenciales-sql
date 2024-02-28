import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('service')
export class ServiceProperty {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string

    @CreateDateColumn({ nullable: false })
    created: Date;

    @UpdateDateColumn({ nullable: false })
    modified: Date;

    @Column()
    provider_id: number;




}
