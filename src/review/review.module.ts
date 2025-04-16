import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ReviewService],
  imports: [PrismaModule],
  exports: [ReviewService],
})
export class ReviewModule {}
