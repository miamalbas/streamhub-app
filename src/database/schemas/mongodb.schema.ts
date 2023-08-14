import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MongoDBData extends Document {
  @Prop({ required: true })
  field: string;

}

export const MongoDBDataSchema = SchemaFactory.createForClass(MongoDBData);
