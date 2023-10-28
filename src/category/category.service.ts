import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './Schema/category.schema';
import { s3Service } from 'src/util/s3';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private readonly appService: s3Service,
  ) {}
  async create(createCatDto: Category, file): Promise<Category> {
    try {
      const createdCat = new this.categoryModel(createCatDto);
      const image = await this.appService.uploadFile(file);

      if (image) {
        createdCat.image = {
          location: image.Location,
          key: image.Key,
        };
      } else {
        throw new Error('Error al cargar la imagen');
      }

      return await createdCat.save();
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      throw error;
    }
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }
  async update(id: string, category: Category, file): Promise<Category> {
    if (file) {
      const categoryDelete = await this.categoryModel.findById(id).exec();
      this.appService.deleteFile(categoryDelete.image.key);
      const image = await this.appService.uploadFile(file);
      if (image) {
        category.image = {
          location: image.Location,
          key: image.Key,
        };
      } else {
        throw new Error('Error al cargar la imagen');
      }
    }
    return this.categoryModel
      .findByIdAndUpdate(id, category, { new: true })
      .exec();
  }
  async remove(id: string): Promise<any> {
    const categoryDelete = await this.categoryModel.findById(id).exec();
    if (categoryDelete.image?.key) {
      this.appService.deleteFile(categoryDelete.image.key);
    }
    return this.categoryModel.findByIdAndRemove(id).exec();
  }
}
