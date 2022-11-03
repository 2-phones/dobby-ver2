import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersEntity } from 'src/entities/Users.entity';
import { UsersRefreshTokensEntity } from 'src/entities/UsersRefreshTokens.entity';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { UserRefreshTokenEntity } from 'src/entities/UserRefresh.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `secret1`,
      signOptions: {
        expiresIn: '30m',
      },
    }),
    TypeOrmModule.forFeature([
      UsersEntity,
      UsersRefreshTokensEntity,
      UserRefreshTokenEntity,
      UserEntity,
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
