import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'generated/prisma';

export class BookEntity implements Book {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  language: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  publisher: string;
  @ApiProperty()
  isbn: string;
  @ApiProperty()
  publishedYear: Date;
  @ApiProperty()
  coverImage: string;
  @ApiProperty()
  pageCount: number;
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
