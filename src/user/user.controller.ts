import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

type User = {
  name: string;
  age: number;
  email: string;
};

@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) { }

  @Post()
  async createUser(@Body() userData: User) {
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
