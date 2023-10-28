import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  create(@Body() comment: Comment) {
    return this.commentService.create(comment);
  }
  @Get()
  findAll() {
    return this.commentService.findAll();
  }
  @Get(':id')
  findByid(@Param('id') id: string) {
    return this.commentService.findById(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() comment: Comment) {
    return this.commentService.update(id, comment);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
