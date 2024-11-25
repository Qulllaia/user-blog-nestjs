import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePost, @UploadedFile() image: any) {
    Logger.log(dto)
    return this.postService.create(dto, image);
  }

  @Get()
  getAllPosts() {
    return this.postService.get();
  }

  @Delete('/:id')
  deletePost(@Param('id') param:string){
    return this.postService.delete(param)
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updatePost(@Body() dto: CreatePost, @UploadedFile() image:any, @Param('id') param:string){
    return this.postService.update(param, dto, image)
  }
}
