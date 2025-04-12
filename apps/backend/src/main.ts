import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const frontendDist = join(__dirname, '../..', 'frontend/dist');

  // Serve static files
  app.useStaticAssets(frontendDist);

  // Serve Vue SPA fallback **only for non-API routes**
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get(/^\/(?!api).*/, (req: Request, res: Response) => {
    res.sendFile(join(frontendDist, 'index.html'));
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
