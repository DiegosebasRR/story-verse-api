import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schema/chapter.schema';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { s3Service } from 'src/util/s3';
import { Story, StorySchema } from 'src/story/schemas/story.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema },
      { name: Story.name, schema: StorySchema },
    ]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, s3Service],
})
export class ChapterModule {}
