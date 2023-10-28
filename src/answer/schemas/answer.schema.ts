import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  User: string;
  @Prop({ required: true })
  Comment: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
