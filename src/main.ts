import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ValidationPipe } from './shared/validation.pipe';
import { AppExceptionFilter } from './shared/app-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('Post-tag example')
    .setDescription('The Post-tag API description')
    .setVersion('1.0')
    .addTag('post')
    .addTag('tag')
    .addTag('file')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.enableCors({ origin: '*', credentials: true });
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AppExceptionFilter(app.get(HttpAdapterHost)));
  await app.listen(PORT);
}
bootstrap();
