import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { CreateUserDTO } from "../dto/CreateUser.dto";
import { UserRepository } from "../user.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const mustNotValidate = await this.userRepository.IsEmailUnique(value);
    return mustNotValidate;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
      return validationArguments.value.message || "This email is already registered in our system."
  }
}

export const IsEmailUnique = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueValidator
    })
  }
}