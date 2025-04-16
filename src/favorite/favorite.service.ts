import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    return await this.prisma.userBookFavorite.findMany({ where: { userId } });
  }

  async toggleMutation(bookId: string, userId: string) {
    const existingFav = await this.prisma.userBookFavorite.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (existingFav) {
      await this.prisma.userBookFavorite.delete({
        where: {
          userId_bookId: {
            userId,
            bookId,
          },
        },
      });
    } else {
      await this.prisma.userBookFavorite.create({
        data: {
          bookId,
          userId,
        },
      });
    }
  }
}
