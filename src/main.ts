import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle("Hospital Appointment Scheduler")
    .setDescription("This project is an API to manage appointments between users (patients and doctors) for a hospital.")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apidocs", app, document);

  await app.listen(3000);

  const databaseService = app.get(DatabaseService);
  await databaseService.createTables();
}
bootstrap();
