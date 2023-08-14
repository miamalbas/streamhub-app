import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoDBDataDto } from './dto/mongodb.dto';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel('MongoDBData') private readonly mongoDBDataModel: Model<MongoDBDataDto>) {}

  
  async createData(data: MongoDBDataDto): Promise<MongoDBDataDto> {
    const newData = new this.mongoDBDataModel(data);
    return await newData.save();
  }
}
