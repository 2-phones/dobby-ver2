import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDeleteMasterEntity } from './Base.entity';

@Entity('users')
export class UsersEntity extends BaseDeleteMasterEntity {
  @Index('EMAIL_UNIQUE', { unique: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'email', length: 30 })
  email: string;

  @Column({ type: 'varchar', name: 'name', length: 30 })
  name: string;

  @Column({
    type: 'varchar',
    name: 'profile_url',
    length: 255,
    nullable: true,
    default: null,
  })
  profile_url: string | null;

  @Column({
    type: 'varchar',
    name: 'profile_color',
    length: 10,
  })
  profile_color: string;

  @Column({
    type: 'varchar',
    name: 'social_type',
    length: 10,
  })
  social_type: string;

  @Column({
    type: 'tinyint',
    name: 'is_connect',
    default: 0,
  })
  is_connect: number;

  @Column({
    type: 'datetime',
    name: 'last_connected_at',
    precision: 6,
    nullable: true,
    default: null,
  })
  last_connected_at: Date | null;
}
