import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Agent } from './agent.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  rut: number;

  @Column({ type: 'varchar', length: 1 })
  dv: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int' })
  process_day: number;

  @Column({ type: 'date' })
  last_process_date: Date;

  @Column({ type: 'varchar', length: 15, default: 'generated' })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modified: Date;

  /*@OneToMany(() => Agent, agent => agent.client)
  agents: Agent[];*/
}
