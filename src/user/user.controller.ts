import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from "uuid";
import { ListUsersDTO } from './dto/ListUser.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) { }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    await this.userRepository.saveUser(userEntity);
    return {
      userId: new ListUsersDTO(userEntity.id, userEntity.name),
      message: 'User created successfully',
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.getUsers();
    const listUsers = savedUsers.map(user => new ListUsersDTO(user.id, user.name));

    return listUsers;
  }
}
