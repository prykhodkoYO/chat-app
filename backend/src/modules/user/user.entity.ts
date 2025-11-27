import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ProfileStatus {
  EMPTY = 'EMPTY',
  COMPLETED = 'COMPLETED',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string | null;

  @Column({
    type: 'enum',
    enum: ProfileStatus,
    default: ProfileStatus.EMPTY,
  })
  profileStatus: ProfileStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
