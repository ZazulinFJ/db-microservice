import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {Employee, EmployeeDocument} from "./entities/employee.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Process, ProcessDocument} from "./entities/process.entity";


@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
                @InjectModel(Process.name) private processModel: Model<ProcessDocument>) {}

    async updateEmp(data){
        let info = await this.employeeModel.bulkWrite(data.queryForBulk)
        let a = await this.processModel.findOneAndUpdate({_id: data.currentProcess._id}, {$inc: {valid: data.queryForBulk.length, updated: info.nModified, created: info.nInserted, duplicate: info.nMatched - info.nModified}})
    }
}
