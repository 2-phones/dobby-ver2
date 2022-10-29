import { CreateUserDto, CreateTokenDto } from './../user/user.dto';
import { UsersEntity } from 'src/entities/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthInfoDto } from './auth.dto';
import { UsersRefreshTokensEntity } from 'src/entities/UsersRefreshTokens.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,

    @InjectRepository(UsersRefreshTokensEntity)
    private tokenRepository: Repository<UsersRefreshTokensEntity>,
  ) {}

  saveToken(refreshToken: CreateTokenDto) {
    const data = { ...refreshToken, ip: '1,2,34', expired_at: new Date() };
    this.tokenRepository.save(data);
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

    this.saveToken({ token: refreshToken });
    return { accessToken, refreshToken };
  }

  getUser(email: string) {
    const user = this.usersRepository.findOne({
      where: { email },
    });
    return user ? true : false;
  }

  createUser(profile: CreateUserDto) {
    this.usersRepository.save(profile);
  }

  // 소셜 체크
  async socialLogin(data: AuthInfoDto): Promise<any> {
    const type = data.social_type;
    console.log(data);
    try {
      const profile =
        type === 'kakao'
          ? await this.kakao(data)
          : type === 'google'
          ? await this.google(data)
          : await this.apple(data);
      console.log(profile);
      const token = await this.createToken(profile.email);
      if (!this.getUser(profile.email)) this.createUser(profile);
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
