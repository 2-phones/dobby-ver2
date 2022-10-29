import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db-c7uqk.pub-cdb.ntruss.com',
  port: 3306,
  username: 'snaps',
  password: 'snaps123!',
  database: 'DobbyTestA',
  entities: [`${__dirname}/./entities/**.entity.{ts,js}`],
  synchronize: false, // 스키마 생성
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = config;
