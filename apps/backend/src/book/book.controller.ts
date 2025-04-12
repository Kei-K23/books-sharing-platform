import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';

@Controller('api/v1/books')
@ApiTags('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
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

  @Patch(':id')
  @ApiOkResponse({ type: BookEntity })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.remove(id);
  }
}
