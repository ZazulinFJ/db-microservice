import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';


export class MongooseConfigService implements MongooseOptionsFactory {
  configService = new ConfigService()
  constructor() {}
  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      uri: this.configService.get('MONGOOSE_URI'),
    };
  }
}
