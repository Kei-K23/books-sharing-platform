import { Module } from '@nestjs/common';
import { BookCopyService } from './book-copy.service';
import { BookCopyController } from './book-copy.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookModule } from 'src/book/book.module';

@Module({
  controllers: [BookCopyController],
  providers: [BookCopyService],
  imports: [PrismaModule, BookModule],
})
export class BookCopyModule {}
