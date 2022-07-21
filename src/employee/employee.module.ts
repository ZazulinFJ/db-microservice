import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Department, DepartmentEntity} from "./entities/department.entity";
import {Employee, EmployeeEntity} from "./entities/employee.entity";
import {Process, ProcessEntity} from "./entities/process.entity";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Department.name, schema: DepartmentEntity },
    { name: Employee.name, schema: EmployeeEntity },
    { name: Process.name, schema: ProcessEntity }
  ])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
