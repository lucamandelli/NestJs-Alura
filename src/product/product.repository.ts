import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductRepository {
    private products: ProductEntity[] = [];

    async saveProduct(product: ProductEntity) {
        this.products.push(product);
    }

    private searchById(id: string) {
        const possibleProduct = this.products.find(product => product.id === id);

        if (!possibleProduct) {
            throw new Error('Product not found');
        }

        return possibleProduct;
    }

    async updateProduct(id: string, productData: Partial<ProductEntity>) {
        const nonUpdatedData = ['id', 'userId'];
        const product = this.searchById(id);
        Object.entries(productData).forEach(([key, value]) => {
            if (nonUpdatedData.includes(key)) {
                return;
            }
            product[key] = value;
        });

        return product;
    }

    async removeProduct(id: string) {
        const removedProduct = this.searchById(id);
        this.products = this.products.filter(product => product.id !== id);
        return removedProduct;
    }

    async getProducts() {
        return this.products;
    }
}