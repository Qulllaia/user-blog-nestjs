import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Post } from './posts.model';
import { FilesModule } from 'src/files/files.module';
import { PostsService } from './posts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule, UsersModule],
})
export class PostsModule {}
