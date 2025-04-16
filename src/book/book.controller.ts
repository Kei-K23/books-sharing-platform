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
  HttpCode,
  HttpStatus,
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
import { FavoriteService } from 'src/favorite/favorite.service';

@Controller('api/v1/books')
@ApiTags('Books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly reviewService: ReviewService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ isArray: true, type: BookEntity })
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookService.findOne(id);
  }

  @Get(':id/copies')
  @ApiOkResponse({ type: BookEntity })
  async findOneWithBookCopies(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookService.findOneWithBookCopies(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookService.remove(id);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetAuthUser() authUser: UserEntity,
  ) {
    return await this.reviewService.create(createReviewDto, authUser.id);
  }

  @Get(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity })
  async getReviews(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reviewService.findAllByBookId(id);
  }

  @Patch(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity })
  async updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @GetAuthUser() authUser: UserEntity,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(id, authUser.id, updateReviewDto);
  }

  @Delete(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity })
  async deleteReview(
    @Param('id', ParseUUIDPipe) id: string,
    @GetAuthUser() authUser: UserEntity,
  ) {
    return await this.reviewService.delete(id, authUser.id);
  }

  @Post(':id/favorites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async mutateFavorites(
    @Param('id', ParseUUIDPipe) id: string,
    @GetAuthUser() authUser: UserEntity,
  ) {
    await this.favoriteService.toggleMutation(id, authUser.id);
    return { success: true };
  }
}
