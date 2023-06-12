import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from "uuid";
import { ListUsersDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

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

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updatedData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, updatedData);

    return {
      user: updatedUser,
      message: 'User updated successfully'
    }
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userRepository.remove(id);

    return {
      user: removedUser,
      message: 'User removed successfully'
    }
  }
}
