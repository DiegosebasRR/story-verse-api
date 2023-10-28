import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { Comment, CommentSchema } from 'src/comment/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
