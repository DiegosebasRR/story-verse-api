import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ immutable: true })
  username: string;

  @Prop()
  password: string;

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

  @Prop({ default: 10 })
  coins: number;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  followers: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
