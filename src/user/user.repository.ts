import { Injectable } from "@nestjs/common";

type User = {
  name: string;
  age: number;
  email: string;
};

@Injectable()
export class UserRepository {
  private users = [];

  async saveUser(user: User) {
    this.users.push(user);
  }
  async getUsers() {
    return this.users;
  }
}