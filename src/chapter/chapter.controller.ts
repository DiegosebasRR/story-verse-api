import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Chapter } from './schema/chapter.schema';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() chapter: Chapter, @UploadedFile() file: Express.Multer.File) {
    return this.chapterService.create(chapter, file);
  }
  @Get()
  findAll() {
    return this.chapterService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.chapterService.findById(id);
  }
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() chapter: Chapter,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.chapterService.update(id, chapter, file);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.chapterService.delete(id);
  }
  @Post(':chapterId/like/:userId')
  async likeChapter(
    @Param('chapterId') chapterId: string,
    @Param('userId') userId: string,
  ) {
    try {
      const chapter = await this.chapterService.likeChapter(chapterId, userId);
      return { message: 'Capítulo liked correctamente', data: chapter };
    } catch (error) {
      return { error: error.message };
    }
  }
}
