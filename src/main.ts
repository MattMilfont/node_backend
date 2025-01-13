/*
  Esse é o arquivo principal da aplicação, aqui é criado o módulo inicial da aplicação,
  definido os dados do Swagger que doumenta a aplicação, configura o CORS de acesso aos módulos
  e carrega a aplicação em uma porta definida.
*/

//Importando a classe de criação de app do Nest
import { NestFactory } from '@nestjs/core';

//Importando o módulo inicial da aplicação
import { AppModule } from './app.module';

//Importando os métodos do Swagger que são utilizados para criar a página de documentação
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  //Cria o app usando o NestFactory e armazena em uma constante
  const app = await NestFactory.create(AppModule);

  //Define as configurações do Swagger utilizando o DocumentBuilder do Nest
  const config = new DocumentBuilder()
    //Título da aplicação na página do Swagger
    .setTitle('Back-end de Exemplo')

    //Descrição da API na página do Swagger
    .setDescription('Documentação da API de exemplo com Swagger')

    //Versão da API
    .setVersion('1.0')

    //Builda o Swagger
    .build();

  //Cria um documento no Swagger para o app utilizando as configurações definidas
  const document = SwaggerModule.createDocument(app, config);

  //Configura o Swagger usando o documento definido e indica a rota pelo qual o swagger pode ser acessado
  SwaggerModule.setup('api', app, document);

  //Configura e ativa o CORS (Cross-origin Resource Sharing)
  app.enableCors({
    //Origens permitidas
    origin: '*',

    //Métodos permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    //Credenciais
    credentials: true,
  });

  //Carrega o app na porta definida
  await app.listen(process.env.PORT ?? 3333, '0.0.0.0');
}

//Chama a função principal
bootstrap();
