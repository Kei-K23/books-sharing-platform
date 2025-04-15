import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './app-config/app-config.module';
import { BookCopyModule } from './book-copy/book-copy.module';

@Module({
  imports: [PrismaModule, BookModule, UserModule, AuthModule, AppConfigModule, BookCopyModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
