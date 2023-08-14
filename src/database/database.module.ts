import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { MongoDBDataSchema } from './schemas/mongodb.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'MongoDBData', schema: MongoDBDataSchema }])],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
