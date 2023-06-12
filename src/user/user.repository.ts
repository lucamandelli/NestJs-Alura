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
}