import { Injectable } from '@nestjs/common';
import { CreateRole } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(roleDto: CreateRole) {
    const role = await this.roleModel.create(roleDto);
    return role;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleModel.findAll({ where: { value } });
    return role;
  }
}
