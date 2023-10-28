import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Story, StoryDocument } from './schemas/story.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/Schemas/user.schema';
import { s3Service } from 'src/util/s3';
import {
  Category,
  CategoryDocument,
} from 'src/category/Schema/category.schema';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private readonly appService: s3Service,
  ) {}
  async create(story: Story, file): Promise<Story> {
    const create = new this.storyModel(story);
    const user = await this.userModel.findById(story.User);
    const category = await this.categoryModel.findById(story.Category);
    if (category) {
      category.Story.push(create._id);
      await category.save();
    } else {
      console.log(`La categoria no fue encontrado.`);
    }
    if (user) {
      user.Story.push(create._id);
      await user.save();
    } else {
      console.log(`El user no fue encontrado.`);
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
  async findAll(): Promise<Story[]> {
    return this.storyModel.find().populate('User').exec();
  }
  async findById(id: string): Promise<Story> {
    return this.storyModel.findById(id).exec();
  }
  async update(id: string, story: Story, file): Promise<Story> {
    if (file) {
      const storyDelete = await this.storyModel.findById(id).exec();
      this.appService.deleteFile(storyDelete.image.key);
      const image = await this.appService.uploadFile(file);
      if (image) {
        story.image = {
          location: image.Location,
          key: image.Key,
        };
      } else {
        throw new Error('Error al cargar la imagen');
      }
    }
    return this.storyModel.findByIdAndUpdate(id, story, { new: true }).exec();
  }
  async remove(id: string): Promise<Story> {
    const storyDelete = await this.storyModel.findById(id).exec();
    if (storyDelete.image?.key) {
      this.appService.deleteFile(storyDelete.image.key);
    }
    return this.storyModel.findByIdAndRemove(id).exec();
  }
}
