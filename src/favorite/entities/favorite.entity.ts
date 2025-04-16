import { ApiProperty } from '@nestjs/swagger';
import { UserBookFavorite } from 'generated/prisma';

export class FavoriteEntity implements UserBookFavorite {
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  userId: string;
}
