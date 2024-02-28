import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('property_service')
export class PropertyService {

    @PrimaryColumn()
    property_id: number;

    @PrimaryColumn()
    service_id: number;

    @Column()
    service_client_id: number

    @CreateDateColumn({ nullable: false })
    created: Date;

    @UpdateDateColumn({ nullable: false })
    modified: Date;
}
