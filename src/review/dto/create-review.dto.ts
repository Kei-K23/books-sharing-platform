import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  bookId: string;
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsNotEmpty()
  comment: string;
}
