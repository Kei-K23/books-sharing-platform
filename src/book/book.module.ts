import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReviewModule } from 'src/review/review.module';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [PrismaModule, ReviewModule, FavoriteModule],
  exports: [BookService],
})
export class BookModule {}
