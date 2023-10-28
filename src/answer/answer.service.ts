import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, AnswerDocument } from './schemas/answer.schema';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/comment/schemas/comment.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async create(answer: Answer): Promise<Answer> {
    const create = new this.answerModel(answer);
    const comment = await this.commentModel.findById(answer.Comment);
    if (comment) {
      comment.Answer.push(create._id);
      await comment.save();
    } else {
      console.log(`La categoria no fue encontrado.`);
    }
    return create.save();
  }
  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }
  async findById(id: string): Promise<Answer> {
    return this.answerModel.findById(id).exec();
  }
  async update(id: string, answer: Answer): Promise<Answer> {
    return this.answerModel.findByIdAndUpdate(id, answer, { new: true }).exec();
  }
  async delete(id: string): Promise<Answer> {
    return this.answerModel.findByIdAndDelete(id).exec();
  }
}
