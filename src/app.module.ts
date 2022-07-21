import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { EmployeeModule } from './employee/employee.module';
import { ProcessModule } from './process/process.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), EmployeeModule, ProcessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
