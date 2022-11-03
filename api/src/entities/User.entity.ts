import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'bobby', name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'name', length: 45 })
  name: string;

  @Column('varchar', { name: 'profile_url', length: 300 })
  profile_url: string;

  @Column('varchar', { name: 'profile_color', length: 10, default: null })
  profile_color: string;

  @Column('varchar', { name: 'social_type', length: 10 })
  social_type: string;
}
