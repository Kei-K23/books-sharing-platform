import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user || (await argon2.verify(user.password, pass))) {
      throw new UnauthorizedException();
    }
    const { password: _password, ...result } = user;

    return result;
  }

  async signUp(signupDto: SignUpDto) {
    const result = await this.userService.create(signupDto);
    return result;
  }
}
