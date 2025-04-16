import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'generated/prisma';
import { BookCopyEntity } from 'src/book-copy/entities/book-copy.entity';

export class BookEntity implements Book {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  language: string;
  @ApiProperty({ nullable: true, required: false, type: String })
  author: string | null;
  @ApiProperty()
  publisher: string | null;
  @ApiProperty({ nullable: true, required: false, type: String })
  isbn: string | null;
  @ApiProperty({ nullable: true, required: false, type: Date })
  publishedYear: Date | null;
  @ApiProperty({ nullable: true, required: false, type: String })
  coverImage: string | null;
  @ApiProperty()
  pageCount: number;
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ type: [BookCopyEntity], required: false })
  bookCopies?: BookCopyEntity[];
}
