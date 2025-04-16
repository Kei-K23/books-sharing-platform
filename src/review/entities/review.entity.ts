import { ApiProperty } from '@nestjs/swagger';
import { Review } from 'generated/prisma';

export class ReviewEntity implements Review {
  @ApiProperty()
  id: string;
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  comment: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
