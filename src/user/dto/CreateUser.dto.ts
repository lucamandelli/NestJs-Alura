import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsEmailUnique } from "../validation/IsEmailUniqueValidatior";

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsEmailUnique()
  email: string;

  @MinLength(6)
  password: string;
}