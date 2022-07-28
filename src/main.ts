import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";
import mongoose from "mongoose";
import {ConfigService} from "@nestjs/config";


async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get('RABBITMQ_URL')}`],
      queue: `${configService.get('RABBITMQ_NAME')}`,
      queueOptions: {
        durable: false
      },
      prefetchCount: 50
    },
  });
  await mongoose.connect(`${configService.get('MONGOOSE_URI')}`);
  await app.listen();
}
bootstrap()
