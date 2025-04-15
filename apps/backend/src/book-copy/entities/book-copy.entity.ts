import { ApiProperty } from '@nestjs/swagger';
import { $Enums, BookCopy } from 'generated/prisma';

export class BookCopyEntity implements BookCopy {
  @ApiProperty()
  id: string;
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  isAvailable: boolean;
  @ApiProperty()
  condition: $Enums.BookCondition;
  @ApiProperty({ nullable: true })
  notes: string | null;
  @ApiProperty()
  format: $Enums.BookCopyFormat;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
