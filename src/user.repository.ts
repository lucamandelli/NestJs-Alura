type User = {
  name: string;
  age: number;
  email: string;
};

export class UserRepository {
    private users = [];

    async save(user: User) {
      this.users.push(user);
      console.log(this.users);
    }
}