import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/user.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService,
    private userService: UserService,
  ) {}

  async create(dto: CreatePost, image: any) {
    let post;
    if (image) {
      const fileName = await this.fileService.createFile(image);
      post = await this.postRepository.create({ ...dto, image: fileName });
    } else {
      post = await this.postRepository.create({ ...dto, image: '' });
    }
    return post;
  }

  async get() {
    const posts = await this.postRepository.findAll({
      include: { all: true },
    });
    return posts;
  }
  async delete(id: string) {
    //Поправлю
    let userId = '1';
    const user = await this.userService.getUser(userId);
    const recult = await firstValueFrom(user);
    console.log(recult);

    const rowDeleted = await this.postRepository.destroy({ where: { id } });
    if (rowDeleted === 1) {
      return this.get();
    } else {
      return new HttpException(
        'Указанный пост не был найден',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, dto: CreatePost, image: any) {
    let post;
    if (image) {
      const fileName = await this.fileService.createFile(image);
      post = await this.postRepository.update(
        { ...dto, image: fileName },
        { where: { id } },
      );
    } else {
      post = await this.postRepository.update(
        { ...dto, image: '' },
        { where: { id } },
      );
    }
    return post;
  }
}
