import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseUpdateRelationEntity } from './Base.entity';

@Entity('users_refresh_tokens')
export class UsersRefreshTokensEntity extends BaseUpdateRelationEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @PrimaryColumn({ type: 'varchar', name: 'ip', length: 20, default: '123' })
  ip: string;

  @Column({ type: 'varchar', name: 'token', length: 255 })
  token: string;

  @Column({ type: 'datetime', name: 'expired_at', precision: 6 })
  expired_at: Date;
}
