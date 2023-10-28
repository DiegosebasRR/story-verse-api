import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter, ChapterDocument } from './schema/chapter.schema';
import { Model } from 'mongoose';
import { s3Service } from 'src/util/s3';
import { Story, StoryDocument } from 'src/story/schemas/story.schema';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    private readonly appService: s3Service,
  ) {}
  async create(chapter: Chapter, file): Promise<Chapter> {
    const create = new this.chapterModel(chapter);
    const story = await this.storyModel.findById(chapter.Story);
    if (story) {
      story.chapter.push(create._id);
      await story.save();
    } else {
      console.log(`La Historia no fue encontrada.`);
    }
    const image = await this.appService.uploadFile(file);
    if (image) {
      create.image = {
        location: image.Location,
        key: image.Key,
      };
    } else {
      throw new Error('Error al cargar la imagen');
    }
    return create.save();
  }
  async findAll(): Promise<Chapter[]> {
    return this.chapterModel.find().exec();
  }
  async findById(id: number): Promise<Chapter> {
    return this.chapterModel.findById(id).exec();
  }
  async update(id: string, chapter: Chapter, file): Promise<Chapter> {
    if (file) {
      const storyDelete = await this.chapterModel.findById(id).exec();
      this.appService.deleteFile(storyDelete.image.key);
      const image = await this.appService.uploadFile(file);
      if (image) {
        chapter.image = {
          location: image.Location,
          key: image.Key,
        };
      } else {
        throw new Error('Error al cargar la imagen');
      }
    }
    return this.chapterModel
      .findByIdAndUpdate(id, chapter, { new: true })
      .exec();
  }
  async delete(id: string): Promise<Chapter> {
    const chapterDelete = await this.chapterModel.findById(id).exec();
    if (chapterDelete.image?.key) {
      this.appService.deleteFile(chapterDelete.image.key);
    }
    return this.chapterModel.findByIdAndDelete(id).exec();
  }
  async likeChapter(chapterId, userId) {
    const chapter = await this.chapterModel.findById(chapterId).exec();
    if (!chapter) {
      throw new Error('Capítulo no encontrado');
    }

    if (chapter.likes.includes(userId)) {
      throw new Error('El usuario ya dio like a este capítulo');
    }

    chapter.likes.push(userId);
    await chapter.save();
    return chapter;
  }
}
