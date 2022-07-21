import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

import {Model} from "mongoose";
import {Process, ProcessDocument} from "../employee/entities/process.entity";

@Injectable()
export class ProcessService {
    constructor(@InjectModel(Process.name) private processModel: Model<ProcessDocument>) {}
    async getInfoProcess(id: string){
        let process = await this.processModel.findOne({_id: id})
        if(!process) return 'такого нет'
        if(process.total === (process.unvalid + process.duplicate + process.updated + process.created) && process.endIn === null){
            process = await this.processModel.findOneAndUpdate({_id: id}, {status: 'end', endIn: new Date()}, {new: true})
        }
        return process
    }
}
