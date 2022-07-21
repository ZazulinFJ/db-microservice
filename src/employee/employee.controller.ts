import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {EventPattern} from "@nestjs/microservices";

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @EventPattern('updateEmp')
  async hello(data: string){
    return this.employeeService.updateEmp(data)
  }
}
