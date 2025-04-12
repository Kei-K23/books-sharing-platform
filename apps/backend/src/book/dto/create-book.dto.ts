import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  title: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  description: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  language: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  author?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  publisher?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  isbn?: string;
  @ApiProperty()
  @IsDate()
  @IsOptional()
  publishedYear?: Date;
  @ApiProperty()
  @IsOptional()
  coverImage?: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  pageCount: number;
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;
}
