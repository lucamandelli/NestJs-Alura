import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

type User = {
  name: string;
  age: number;
  email: string;
};

@Controller('/users')
export class UserController {
  private userRepository = new UserRepository();

  @Post()
  async createUser(@Body() userData: User) {
    await this.userRepository.save(userData);
    return { data: userData };
  }
}
