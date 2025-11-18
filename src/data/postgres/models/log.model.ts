import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum SeverityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity('logs')
export class LogModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 500 })
  message!: string;

  @Column({ type: 'varchar', length: 255 })
  origin!: string;

  @Column({
    type: 'enum',
    enum: SeverityLevel,
    default: SeverityLevel.LOW,
  })
  level!: SeverityLevel;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
