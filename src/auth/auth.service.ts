import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as argon2 from 'argon2';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized-exception';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthEntity> {
    const user = await this.userService.findOneByEmail(email);

    if (!user || !(await argon2.verify(user.password, pass))) {
      throw new UnauthorizedException('Invalid sign in credentials');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: new UserEntity(user),
    };
  }

  async signUp(signupDto: SignUpDto) {
    const result = await this.userService.create(signupDto);
    return result;
  }
}
