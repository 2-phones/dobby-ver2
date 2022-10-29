import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `secret1`,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = payload.sub === '0';
    if (!user) throw new UnauthorizedException('정보를 확인할 수 없습니다.');
    return user;
  }
}
