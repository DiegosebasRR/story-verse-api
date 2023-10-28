import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from './schemas/story.schema';
import { User, UserSchema } from 'src/auth/Schemas/user.schema';
import { s3Service } from 'src/util/s3';
import { Category, CategorySchema } from 'src/category/Schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Story.name, schema: StorySchema },
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [StoryController],
  providers: [StoryService, s3Service],
})
export class StoryModule {}
