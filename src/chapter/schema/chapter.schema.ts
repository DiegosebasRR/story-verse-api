import mongoose, { Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ChapterDocument = Chapter & Document;

@Schema()
export class Chapter {
  @Prop()
  title: string;
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Story' })
  Story: Types.ObjectId;
  @Prop()
  time: number;
  @Prop()
  content: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  Comment: Types.ObjectId[];
  @Prop()
  views: number;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  likes: Types.ObjectId[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
