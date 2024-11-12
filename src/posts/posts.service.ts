import { Injectable } from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { Logger } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/users/user.model';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService,
  ) {}
  
  async create(dto: CreatePost, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
  
  async get() {
    const posts = await this.postRepository.findAll({
      include: { all: true },
    });
    return posts;
  }
  async delete() {
    
  }
}
