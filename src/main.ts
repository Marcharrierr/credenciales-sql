import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';





async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Habilitando CORS
  app.enableCors();

  const logger = new Logger('Bootstrap');
  logger.log(`Conectando a la base de datos: ${process.env.MYSQL_DATABASE}`);

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();