import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swaggerOptions = new DocumentBuilder()
    .setTitle('W4 Project')
    .setVersion('1.0.0')
    .setDescription('Encode Club Bootcamp July Project for W4')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
