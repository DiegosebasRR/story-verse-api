import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule } from './category/category.module';
import { StoryModule } from './story/story.module';

import { ChapterModule } from './chapter/chapter.module';
import { CommentModule } from './comment/comment.module';
import { AnswerModule } from './answer/answer.module';
import { FollowRelationModule } from './follow-relation/follow-relation.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://diegoriveros:ceviche@storyverse.dqdcbw2.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    CategoryModule,
    StoryModule,
    ChapterModule,
    CommentModule,
    AnswerModule,
    FollowRelationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
