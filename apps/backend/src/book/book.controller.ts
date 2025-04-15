import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { ReviewService } from 'src/review/review.service';
import { GetAuthUser } from 'src/auth/decorators/get-auth-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateReviewDto } from 'src/review/dto/update-review.dto';

@Controller('api/v1/books')
@ApiTags('Books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly reviewService: ReviewService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ isArray: true, type: BookEntity })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOne(id);
  }

  @Get(':id/copies')
  @ApiOkResponse({ type: BookEntity })
  findOneWithBookCopies(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOneWithBookCopies(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.remove(id);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetAuthUser() authUser: UserEntity,
  ) {
    return this.reviewService.create(createReviewDto, authUser.id);
  }

  @Get(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  getReviews(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.findAllByBookId(id);
  }

  @Patch(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @GetAuthUser() authUser: UserEntity,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, authUser.id, updateReviewDto);
  }

  @Delete(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  deleteReview(
    @Param('id', ParseUUIDPipe) id: string,
    @GetAuthUser() authUser: UserEntity,
  ) {
    return this.reviewService.delete(id, authUser.id);
  }
}
