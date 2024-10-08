import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-role.model';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RoleModule],
  exports: [UsersService],
})
export class UsersModule {}
