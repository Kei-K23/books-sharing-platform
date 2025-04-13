import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return {
          secret:
            appConfigService.getJWTAccessTokenKey() || 'YOUR_SUPER_SECRET',
          signOptions: {
            expiresIn: appConfigService.getJWTAccessTokenExpiresIn() || '7d',
          },
        };
      },
    }),
  ],
  exports: [AuthService, JwtModule, JwtStrategy],
})
export class AuthModule {}
