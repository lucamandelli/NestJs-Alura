import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async saveUser(newUser: UserEntity) {
    this.users.push(newUser);
  }
  async getUsers() {
    return this.users;
  }

  async IsEmailUnique(email: string) {
    const possibleUser = this.users.find(
      user => user.email === email
    );

    const isUnique = possibleUser === undefined;

    return isUnique
  }

  async update(id: string, updatedData: Partial<UserEntity>) {
    const possibleUser = this.users.find(user => user.id === id);

    if (!possibleUser) {
      return {
        message: 'User not found'
      }
    }

    Object.entries(updatedData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      possibleUser[key] = value;
    });

    return possibleUser;
  }

  async remove(id: string) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      return {
        message: 'User not found'
      }
    }

    this.users = this.users.filter(user => user.id !== id);

    return user;
  }
}