import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from 'generated/prisma';
import { Exclude } from 'class-transformer';
import { BookEntity } from 'src/book/entities/book.entity';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @Exclude()
  password: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  isVerify: boolean;
  @ApiProperty()
  profilePicture: string | null;
  @ApiProperty()
  role: $Enums.UserRole;
  @ApiProperty()
  bio: string | null;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, type: [BookEntity] })
  books?: BookEntity[];
}
