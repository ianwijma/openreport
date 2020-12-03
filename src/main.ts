import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('openreport.dev Api')
    .setDescription('The openreport.dev api')
    .setVersion('1.0')
    .addTag('openreport')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);

  const port = process.env.PORT || config.get('server.port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
