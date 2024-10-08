import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRole } from './dto/create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  createRole(@Body() roleDto: CreateRole) {
    return this.roleService.createRole(roleDto);
  }

  @Get('/:value')
  getRoles(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
