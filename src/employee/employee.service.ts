import { Injectable } from '@nestjs/common';

import { EmployeeEntity } from './entities/employee.entity';
import { ProcessEntity } from './entities/process.entity';
import { DBFactory } from '../mongo-wrapper/mongo-wrapper.service';

@Injectable()
export class EmployeeService {
  private employeeModel = DBFactory.getModel('Employee', EmployeeEntity);
  private processModel = DBFactory.getModel('Process', ProcessEntity);

  async updateEmp(data) {
    const info = await this.employeeModel.bulkWrite(data.queryForBulk);
    console.log(info);
    await this.processModel.findOneAndUpdate(
      { _id: data.currentProcess._id },
      {
        $inc: {
          valid: data.queryForBulk.length,
          updated: info.nModified,
          created: info.nInserted,
          duplicate: info.nMatched - info.nModified,
        },
      },
    );
  }
}
