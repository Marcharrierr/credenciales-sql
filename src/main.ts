import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';





async function bootstrap() {



  const app = await NestFactory.create(AppModule);


  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token');
    res.header('Access-Control-Allow-Methods', 'OPTIONS', 'POST');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });




  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  //Documentar api Swagger

  const config = new DocumentBuilder()
    .setTitle("Api conexión bd cloud")
    .setDescription("Users Api bd")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);



  // Habilitando CORS
  app.enableCors();

  const logger = new Logger('Bootstrap');
  logger.log(`Conectando a la base de datos: ${process.env.MYSQL_DATABASE}`);

  await app.listen(parseInt(process.env.PORT) || 3000);



  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = parseInt(process.env.PORT) || 3000;
    await app.listen(port);
    logger.log(`La API está corriendo en el puerto: $${port}`);
  }

}
bootstrap();