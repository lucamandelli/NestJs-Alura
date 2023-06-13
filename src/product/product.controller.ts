import { Body, Controller, Get, Post, Delete, Param, Put } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { v4 as uuid } from "uuid";
import { ProductEntity } from "./product.entity";
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";


@Controller('/products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) { }

  @Get()
  async getProducts() {
    const products = await this.productRepository.getProducts();
    return {
      data: products,
      message: 'Products retrieved successfully',
      status: 200,
    };
  }

  @Post()
  async createProduct(@Body() productData) {
    const product = new ProductEntity();

    product.id = uuid();
    product.name = productData.name;
    product.userId = productData.userId;
    product.price = productData.price;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.category = productData.category;
    product.characteristics = productData.characteristics;
    product.images = productData.images;

    const createdProduct = await this.productRepository.saveProduct(product);
    return {
      data: createdProduct,
      message: 'Product created successfully',
      status: 201,
    };
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const updatedProduct = await this.productRepository.updateProduct(id, productData);

    return {
      message: 'Product updated successfully',
      product: updatedProduct
    }
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    const removedProduct = await this.productRepository.removeProduct(id);

    return {
      message: 'Product removed successfully',
      product: removedProduct
    }
  }
}