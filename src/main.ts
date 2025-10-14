import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './nest/app.module';
import { EntityValidationFilter } from './nest/filters/entity-validation.filter';
import { InvalidUuidFilter } from './nest/filters/invalid-uuid.filter';
import { NotFoundFilter } from './nest/filters/not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new EntityValidationFilter());
  app.useGlobalFilters(new NotFoundFilter());
  app.useGlobalFilters(new InvalidUuidFilter());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('BANAP Engineer API')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      'token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
