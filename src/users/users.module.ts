import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Post } from 'src/posts/posts.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Post])],
})
export class UsersModule {}
