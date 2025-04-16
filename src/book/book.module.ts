import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReviewModule } from 'src/review/review.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [PrismaModule, ReviewModule],
  exports: [BookService],
})
export class BookModule {}
