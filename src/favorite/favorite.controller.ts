import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetAuthUser } from 'src/auth/decorators/get-auth-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('api/v1/favorites')
@ApiTags('Favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async getAllFavoriteByUserId(@GetAuthUser() authUser: UserEntity) {
    return await this.favoriteService.findAllByUserId(authUser.id);
  }
}
