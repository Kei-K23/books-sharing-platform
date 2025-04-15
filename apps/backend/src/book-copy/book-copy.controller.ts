import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookCopyService } from './book-copy.service';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import { UpdateBookCopyDto } from './dto/update-book-copy.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookCopyEntity } from './entities/book-copy.entity';

@Controller('api/v1/copies')
@ApiTags('Book Copy')
export class BookCopyController {
  constructor(private readonly bookCopyService: BookCopyService) {}

  @Post()
  @ApiCreatedResponse({ type: BookCopyEntity })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBookCopyDto: CreateBookCopyDto) {
    return this.bookCopyService.create(createBookCopyDto);
  }

  @Get()
  @ApiOkResponse({ type: BookCopyEntity, isArray: true })
  findAll() {
    return this.bookCopyService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookCopyEntity })
  findOne(@Param('id') id: string) {
    return this.bookCopyService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookCopyEntity })
  update(
    @Param('id') id: string,
    @Body() updateBookCopyDto: UpdateBookCopyDto,
  ) {
    return this.bookCopyService.update(id, updateBookCopyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookCopyEntity })
  remove(@Param('id') id: string) {
    return this.bookCopyService.remove(id);
  }
}
