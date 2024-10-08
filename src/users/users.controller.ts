import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUser) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
