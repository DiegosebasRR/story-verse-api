import mongoose, { Document, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type StoryDocument = Story & Document;

@Schema()
export class Story {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  User: Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;
  @Prop({
    type: {
      key: { type: String },
      location: { type: String },
    },
  })
  image: {
    key: string;
    location: string;
  };
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  Category: Types.ObjectId;
  @Prop()
  tags: string[];
  @Prop()
  language: string;
  @Prop()
  classification: string;
  @Prop()
  time: number;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }])
  chapter: Types.ObjectId[];

  @Prop()
  views: number;
  @Prop()
  like: string;
}

export const StorySchema = SchemaFactory.createForClass(Story);
