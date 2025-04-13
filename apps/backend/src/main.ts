import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { Request, Response } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Only show API documentation when not in production
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Books Sharing Platform')
      .setDescription('Books Sharing Platform for book lovers')
      .addBearerAuth()
      .setVersion('0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    app.use(
      '/api/v1/docs',
      apiReference({
        spec: {
          content: document,
        },
      }),
    );
  }

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Global interceptors pipe
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // Global exceptions filters
  app.useGlobalFilters(new GlobalExceptionFilter());

  const frontendDist = join(__dirname, '../..', 'frontend/dist');
  // Serve static files
  app.useStaticAssets(frontendDist);

  // Serve Vue SPA fallback **only for non-API routes**
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get(/^\/(?!api).*/, (_req: Request, res: Response) => {
    res.sendFile(join(frontendDist, 'index.html'));
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
