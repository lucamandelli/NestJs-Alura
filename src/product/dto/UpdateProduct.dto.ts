import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCaracteristicsDTO } from './ProductCaracteristics.dto';
import { ProductImageDTO } from './ProductImage.dto';

export class UpdateProductDTO {
  @IsUUID(undefined)
  id: string;

  @IsUUID(undefined)
  usuarioId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1)
  @IsOptional()
  valor: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantidadeDisponivel: number;

  @IsString()
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCaracteristicsDTO)
  @IsOptional()
  caracteristicas: ProductCaracteristicsDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  imagens: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Product category can not be empty.' })
  @IsOptional()
  categoria: string;
}