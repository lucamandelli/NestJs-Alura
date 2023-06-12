import { IsNotEmpty, IsString } from "class-validator";

export class ProductCaracteristicsDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}