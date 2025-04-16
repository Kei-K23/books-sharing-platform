import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(150)
  email: string;
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(18)
  password: string;
}
