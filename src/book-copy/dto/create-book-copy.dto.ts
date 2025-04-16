import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { $Enums } from 'generated/prisma';

export class CreateBookCopyDto {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  bookId: string;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;
  @ApiProperty({ default: $Enums.BookCondition.GOOD, required: false })
  @IsEnum($Enums.BookCondition)
  @IsNotEmpty()
  condition: $Enums.BookCondition;
  @ApiProperty({ nullable: true, type: String, required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  notes: string | null;
  @ApiProperty()
  @IsEnum($Enums.BookCopyFormat)
  @IsNotEmpty()
  format: $Enums.BookCopyFormat;
}
