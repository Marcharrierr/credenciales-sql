import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';



@Entity('property')
export class Property {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    community_rut: number;

    @Column({ nullable: false })
    community_dv: string;

    @Column({ nullable: false })
    community_name: string;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    region: string;

    @Column({ nullable: false })
    municipality: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    tower: string;

    @Column({ nullable: false })
    department: string;

    @Column({ nullable: false, default: 'ACTIVO' })
    status: string;

    @Column({ nullable: false, default: 'NO-PROCESADO' })
    last_process_status: string;


    // @Transform(({ value }) => moment(value).format('YYYY/MM/DD'))
    @Column({ type: 'date', nullable: false, default: '2000-01-01' })
    last_process_date: Date;


    @CreateDateColumn({ nullable: false })
    created: Date;

    @UpdateDateColumn({ nullable: false })
    modified: Date;

    @Column({ nullable: false })
    client_id: number;

}
