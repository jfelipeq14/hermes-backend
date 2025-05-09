import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hermes')
    .setDescription('The Hermes API description')
    .setVersion('0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter JWT Bearer token',
    })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const jwtAuthGuard = app.get(JwtAuthGuard);
  const rolesGuard = app.get(RolesGuard);

  app.useGlobalGuards(jwtAuthGuard, rolesGuard);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap()
  .then(() => {
    console.log(`Running: http://localhost:${process.env.PORT ?? 3000}`);
  })
  .catch(() => {
    console.log('Error');
  });
