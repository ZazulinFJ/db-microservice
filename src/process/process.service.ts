import { Injectable } from '@nestjs/common';
import { ProcessEntity } from '../employee/entities/process.entity';
import { DBFactory } from '../mongo-wrapper/mongo-wrapper.service';

@Injectable()
export class ProcessService {
  processModel = DBFactory.getModel('Process', ProcessEntity);

  async getInfoProcess(id: string) {
    let process = await this.processModel.findOne({ _id: id });
    if (!process) return 'такого нет';
    if (
      process.total ===
        process.unvalid +
          process.duplicate +
          process.updated +
          process.created &&
      process.endIn === null
    ) {
      process = await this.processModel.findOneAndUpdate(
        { _id: id },
        { status: 'end', endIn: new Date() },
        { new: true },
      );
    }
    return process;
  }
}
