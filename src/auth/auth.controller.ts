import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetAuthUser } from './decorators/get-auth-user.decorator';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @HttpCode(HttpStatus.OK)
  getProfile(@GetAuthUser() authUser: UserEntity) {
    return new UserEntity(authUser);
  }

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @GetAuthUser() authUser: UserEntity,
    @Body() updateProfileDto: UpdateUserDto,
  ) {
    return new UserEntity(
      await this.userService.update(authUser.id, updateProfileDto),
    );
  }
}
