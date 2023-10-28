import mongoose, { Document, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
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
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }] })
  Story: Array<Types.ObjectId>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
