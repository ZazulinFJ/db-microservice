import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { EmployeeModule } from './employee/employee.module';
import { ProcessModule } from './process/process.module';
import {WinstonModule} from "nest-winston";
import {MongooseConfigService} from "./config/mongoose.config.service";
import {ConfigModule} from "@nestjs/config";



@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot('mongodb://localhost/nest'),
      EmployeeModule,
      ProcessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
