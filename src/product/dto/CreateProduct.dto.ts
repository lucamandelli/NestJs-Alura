import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCaracteristicsDTO } from "./ProductCaracteristics.dto";
import { ProductImageDTO } from "./ProductImage.dto";
import { Type } from "class-transformer";

export class CreateProductDTO {
  @IsUUID(undefined, {message: "Invalid ID."})
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(3)
  @Type(() => ProductCaracteristicsDTO)
  caracteristics: ProductCaracteristicsDTO[];

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty()
  category: string;
}