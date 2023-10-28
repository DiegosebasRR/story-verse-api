import mongoose, { Document, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  User: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' })
  Chapter: Types.ObjectId;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }])
  Answer: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
