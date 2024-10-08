import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUser } from './dto/create-user.dto';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { where } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesRepository: RoleService,
  ) {}
  async createUser(dto: CreateUser) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesRepository.getRoleByValue('user');
    await user.$set('roles', [role[0].id]);
    user.roles = [...role];
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
