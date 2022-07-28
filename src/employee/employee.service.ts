import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {Employee, EmployeeDocument, EmployeeEntity} from "./entities/employee.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Process, ProcessDocument, ProcessEntity} from "./entities/process.entity";
import {DBFactory} from "../mongo-wrapper/mongo-wrapper.service";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class EmployeeService {
    serviceConfig = new ConfigService()
    private employeeModel = DBFactory.getModel('Employee', EmployeeEntity);
    private processModel = DBFactory.getModel('Process', ProcessEntity);

    async updateEmp(data){
        let info = await this.employeeModel.bulkWrite(data.queryForBulk)
        console.log(info)
        await this.processModel.findOneAndUpdate({_id: data.currentProcess._id}, {$inc: {valid: data.queryForBulk.length, updated: info.nModified, created: info.nInserted, duplicate: info.nMatched - info.nModified}})
    }
}
