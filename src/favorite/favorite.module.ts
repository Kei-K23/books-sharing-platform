import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavoriteController } from './favorite.controller';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
  imports: [PrismaModule],
})
export class FavoriteModule {}
