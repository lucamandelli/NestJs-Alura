import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ProductImageDTO {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}