import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { BadRequestException } from 'src/common/exceptions/bad-request-exception';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    // First check user already make review for the book
    const existingReview = await this.prisma.review.findFirst({
      where: {
        bookId: createReviewDto.bookId,
        userId,
      },
    });
    if (existingReview) {
      throw new BadRequestException('You already gave review for the book');
    }

    // Check users cannot give reviews their own book
    const existingBook = await this.prisma.book.findUnique({
      where: { id: createReviewDto.bookId, ownerId: userId },
    });
    if (existingBook) {
      throw new BadRequestException('You cannot give review for your own book');
    }

    return await this.prisma.review.create({
      data: { ...createReviewDto, userId },
    });
  }

  async findAll() {
    return await this.prisma.review.findMany();
  }

  async findAllByBookId(bookId: string) {
    return await this.prisma.review.findMany({ where: { bookId } });
  }

  async findById(id: string) {
    return await this.prisma.review.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.findById(id);

    return this.prisma.review.update({
      where: { id: review.id },
      data: updateReviewDto,
    });
  }

  async delete(id: string) {
    const review = await this.findById(id);

    return this.prisma.review.delete({
      where: { id: review.id },
    });
  }
}
