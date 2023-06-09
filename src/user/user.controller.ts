import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) { }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    await this.userRepository.saveUser(userData);
    return {
      data: userData,
      message: 'User created successfully',
      status: 201,
    };
  }

  @Get()
  async listUsers() {
    const users = await this.userRepository.getUsers();
    return {
      data: users,
      message: 'Users retrieved successfully',
      status: 200,
    };
  }
}
