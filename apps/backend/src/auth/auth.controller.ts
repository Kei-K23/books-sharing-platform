import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('api/v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('/sign-up')
  @ApiCreatedResponse({ type: UserEntity })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto) {
    return new UserEntity(await this.authService.signUp(signUpDto));
  }
}
