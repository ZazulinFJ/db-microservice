import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import {MongooseModule} from "@nestjs/mongoose";

import {Process, ProcessEntity} from "../employee/entities/process.entity";

@Module({
  imports:[MongooseModule.forFeature([
    { name: Process.name, schema: ProcessEntity }
  ])],
  controllers: [ProcessController],
  providers: [ProcessService]
})
export class ProcessModule {}
