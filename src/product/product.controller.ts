import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";

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
    await this.productRepository.saveProduct(productData);
    return {
      data: productData,
      message: 'Product created successfully',
      status: 201,
    };
  }
}