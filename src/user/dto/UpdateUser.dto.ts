import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { IsEmailUnique } from "../validation/IsEmailUniqueValidatior";

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsEmailUnique()
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}