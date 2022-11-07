import { CreateUserDto, CreateTokenDto } from './../user/user.dto';
import { UsersEntity } from 'src/entities/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthInfoDto } from './auth.dto';
import { UsersRefreshTokensEntity } from 'src/entities/UsersRefreshTokens.entity';
import { UserEntity } from 'src/entities/User.entity';
import { UserRefreshTokenEntity } from 'src/entities/UserRefresh.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(UserRefreshTokenEntity)
    private tokenRepository: Repository<UserRefreshTokenEntity>,
  ) {}

  saveToken(token: CreateTokenDto) {
    const data = 'refreshToken';

    this.tokenRepository.save(token);
  }

  async checkToken(token: string) {
    return await this.tokenRepository.findOne({ where: { token } });
  }

  // 토큰 발급
  async createToken(email: any): Promise<any> {
    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(
      {},
      {
        expiresIn: '14d',
      },
    );

    !(await this.checkToken) ? this.saveToken({ token: refreshToken }) : null;
    return { accessToken, refreshToken };
  }

  // boolean? 함수명
  async checkUser(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? true : false;
  }

  createUser(profile: CreateUserDto) {
    this.userRepository.save(profile);
  }

  // 소셜 체크
  async socialLogin(data: AuthInfoDto): Promise<any> {
    const type = data.social_type;
    try {
      const profile =
        type === 'kakao'
          ? await this.kakao(data)
          : type === 'google'
          ? await this.google(data)
          : type === 'apple'
          ? await this.apple(data)
          : 'err';
      if (!profile.email) return { statusCode: 400, message: 'Info error' };
      const token = await this.createToken(profile.email);
      const yesorno = await this.checkUser(profile.email);
      if (!yesorno) this.createUser(profile);
      return token;
    } catch (err) {
      return err;
    }
  }

  // 카카오 로그인
  async kakao(data: AuthInfoDto): Promise<any> {
    try {
      const userInfo = await axios.get(process.env.KAKAO_URL, {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      const { nickname: name, profile_image_url: profile_url } =
        userInfo.data.kakao_account.profile;
      const { email } = userInfo.data.kakao_account;
      return { name, profile_url, email, social_type: data['social_type'] };
    } catch (err) {
      return err;
    }
  }

  // 구글
  async google(data: AuthInfoDto): Promise<any> {
    return 'hello';
  }

  // 애플
  async apple(data: AuthInfoDto): Promise<any> {
    return 'apple';
  }
  // 로그인 토큰 테스트 로직
  // async logintest(data: string) {
  //   try {
  //     return await this.createToken(data);
  //   } catch (err) {
  //     return err;
  //   }
  // }
}
