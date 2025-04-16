import { Injectable } from '@nestjs/common';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import { UpdateBookCopyDto } from './dto/update-book-copy.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from 'src/book/book.service';

@Injectable()
export class BookCopyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookService: BookService,
  ) {}

  async create(createBookCopyDto: CreateBookCopyDto) {
    // Check book is exist to create book copy
    await this.bookService.findOne(createBookCopyDto.bookId);
    return await this.prisma.bookCopy.create({ data: createBookCopyDto });
  }

  async findAll() {
    return await this.prisma.bookCopy.findMany({
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    return await this.prisma.bookCopy.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updateBookCopyDto: UpdateBookCopyDto) {
    // Check book is exist to update the book copy
    if (updateBookCopyDto.bookId) {
      await this.bookService.findOne(updateBookCopyDto.bookId);
    }

    const bookCopy = await this.findOne(id);

    return await this.prisma.bookCopy.update({
      where: { id: bookCopy.id },
      data: updateBookCopyDto,
    });
  }

  async remove(id: string) {
    const bookCopy = await this.findOne(id);

    return await this.prisma.bookCopy.delete({
      where: { id: bookCopy.id },
    });
  }
}
