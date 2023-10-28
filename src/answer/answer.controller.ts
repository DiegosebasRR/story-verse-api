import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './schemas/answer.schema';
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  @Post()
  create(@Body() answer: Answer) {
    return this.answerService.create(answer);
  }
  @Get()
  findAll() {
    return this.answerService.findAll();
  }
  @Get(':id')
  findByid(@Param('id') id: string) {
    return this.answerService.findById(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() answer: Answer) {
    return this.answerService.update(id, answer);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.answerService.delete(id);
  }
}
