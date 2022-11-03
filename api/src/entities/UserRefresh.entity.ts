import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User_RefreshToken')
export class UserRefreshTokenEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'token', length: 250 })
  token: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  created_at: Date;

  //   @Column({ type: 'datetime', name: 'expired_at' })
  //   expired_at: Date;
}
