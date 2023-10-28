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
import { StoryService } from './story.service';
import { Story } from './schemas/story.schema';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() story: Story, @UploadedFile() file: Express.Multer.File) {
    return this.storyService.create(story, file);
  }
  @Get()
  findAll() {
    return this.storyService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.storyService.findById(id);
  }
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() story: Story,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.storyService.update(id, story, file);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(id);
  }
}
