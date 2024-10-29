import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUser } from './dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesRepository.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role[0].id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или пароль не были найдены',
      HttpStatus.NOT_FOUND,
    );
  }
  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user?.save();
    }
    return user;
  }
}
