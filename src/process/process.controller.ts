import { Controller } from '@nestjs/common';
import { ProcessService } from './process.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @EventPattern('getInfoProcess')
  async getInfo(id: string) {
    try {
      return await this.processService.getInfoProcess(id);
    } catch (e) {
      console.log(e);
    }
  }
}
