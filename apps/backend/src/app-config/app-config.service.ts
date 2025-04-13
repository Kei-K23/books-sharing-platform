import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getJWTAccessTokenKey() {
    return this.configService.get<string>('JWT_ACCESS_TOKEN_KEY');
  }

  getJWTAccessTokenExpiresIn() {
    return this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN');
  }
}
