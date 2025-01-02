import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Back-end de Exemplo')
    .setDescription('Documentação da API de exemplo com Swagger')
    .setVersion('1.0')
    .addTag('exemplo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
