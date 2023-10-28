import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { Chapter, ChapterDocument } from 'src/chapter/schema/chapter.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
  ) {}
  async create(comment: Comment): Promise<Comment> {
    const create = new this.commentModel(comment);
    const chapter = await this.chapterModel.findById(comment.Chapter);
    if (chapter) {
      chapter.Comment.push(create._id);
      await chapter.save();
    } else {
      console.log(`La categoria no fue encontrado.`);
    }
    return create.save();
  }
  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }
  async findById(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }
  async update(id: string, comment: Comment): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, comment, { new: true })
      .exec();
  }
  async delete(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
