import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { $Enums } from 'generated/prisma';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  username: string;
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
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  location: string;
  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  isVerify?: boolean;
  @ApiProperty()
  @IsString()
  @IsOptional()
  profilePicture?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  bio?: string;
  @ApiProperty({ default: $Enums.UserRole })
  @IsEnum($Enums.UserRole)
  @IsOptional()
  role?: $Enums.UserRole;
}
