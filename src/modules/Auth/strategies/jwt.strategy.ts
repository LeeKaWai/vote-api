import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.validateUser(
        payload.email,
        payload.userType,
      );
      if (!user) {
        return UnauthorizedException;
      }
      return {
        email: user.email,
        status: user.status,
        userType: payload.userType,
        _id: payload.sub,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
