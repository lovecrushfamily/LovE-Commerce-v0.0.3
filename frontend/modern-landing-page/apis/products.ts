import type { Product, Category } from "@/types";
import { mockProducts, mockCategories } from "@/lib/mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const API_BASE_URL = 'http://localhost:3000/api';

export class RealProductAPI {
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/get-all`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      console.log("=== Real API Products ===");
      console.log(products);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/get-id/${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();
      console.log("=== Real API Product by ID ===");
      console.log(product);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  static async createProduct(product: Omit<Product, 'product_id' | 'created_at' | 'updated_at'>): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      const newProduct = await response.json();
      console.log("=== Real API Created Product ===");
      console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  static async updateProduct(product: Product): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const updatedProduct = await response.json();
      console.log("=== Real API Updated Product ===");
      console.log(updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  static async deleteProduct(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      console.log("=== Real API Deleted Product ID ===");
      console.log(id);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  static async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const products = await this.getAllProducts();
      const filteredProducts = products.filter(product => product.category_id === categoryId);
      console.log("=== Real API Products by Category ===");
      console.log(filteredProducts);
      return filteredProducts;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  }

  static async searchProducts(query: string): Promise<Product[]> {
    try {
      const products = await this.getAllProducts();
      const lowercaseQuery = query.toLowerCase();
      const searchResults = products.filter(
        product =>
          product.product_name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.traits.toLowerCase().includes(lowercaseQuery)
      );
      console.log("=== Real API Search Results ===");
      console.log(searchResults);
      return searchResults;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      const products = await this.getAllProducts();
      // const featuredProducts = products.filter(product => product.rating >= 4.5);
      // console.log("=== Real API Featured Products ===");
      console.log(products);
      return products;
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  }

  static async getRelatedProducts(productId: number): Promise<Product[]> {
    try {
      const product = await this.getProductById(productId);
      if (!product) return [];
      
      const products = await this.getAllProducts();
      const relatedProducts = products
        .filter(p => p.product_id !== productId && p.category_id === product.category_id)
        .slice(0, 4);
      console.log("=== Real API Related Products ===");
      console.log(relatedProducts);
      return relatedProducts;
    } catch (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
  }
}

// Keep the existing mock implementations
export class ProductAPI {
  static async getAllProducts(): Promise<Product[]> {
    await delay(500);
    console.log("=== Mock Products Data ===");
    console.log(mockProducts);
    return mockProducts;
  }

  static async getProductById(id: number): Promise<Product | null> {
    await delay(300);
    const product = mockProducts.find((product) => product.product_id === id) || null;
    console.log("=== Mock Product by ID ===");
    console.log(product);
    return product;
  }

  static async getProductsByCategory(categoryId: number): Promise<Product[]> {
    await delay(400);
    const products = mockProducts.filter(
      (product) => product.category_id === categoryId
    );
    console.log("=== Mock Products by Category ===");
    console.log(products);
    return products;
  }

  static async searchProducts(query: string): Promise<Product[]> {
    await delay(600);
    const lowercaseQuery = query.toLowerCase();
    const products = mockProducts.filter(
      (product) =>
        product.product_name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.traits.toLowerCase().includes(lowercaseQuery)
    );
    console.log("=== Mock Search Results ===");
    console.log(products);
    return products;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    await delay(400);
    const products = mockProducts.filter((product) => product.rating >= 4.5);
    console.log("=== Mock Featured Products ===");
    console.log(products);
    return products;
  }

  static async getRelatedProducts(productId: number): Promise<Product[]> {
    await delay(300);
    const product = mockProducts.find((p) => p.product_id === productId);
    if (!product) {
      console.log("=== Mock Related Products ===");
      console.log([]);
      return [];
    }
    const related = mockProducts
      .filter(
        (p) => p.product_id !== productId && p.category_id === product.category_id
      )
      .slice(0, 4);
    console.log("=== Mock Related Products ===");
    console.log(related);
    return related;
  }
}

export class CategoryAPI {
  static async getAllCategories(): Promise<Category[]> {
    await delay(300);
    console.log("=== Mock Categories ===");
    console.log(mockCategories);
    return mockCategories;
  }

  static async getCategoryById(id: number): Promise<Category | null> {
    await delay(200);
    const category =
      mockCategories.find((category) => category.id === id) || null;
    console.log("=== Mock Category by ID ===");
    console.log(category);
    return category;
  }
}

// Add comparison utility class
export class APIComparison {
  static async compareAllProducts(): Promise<void> {
    console.log("=== Comparing getAllProducts ===");
    try {
      const [mockProducts, realProducts] = await Promise.all([
        ProductAPI.getAllProducts(),
        RealProductAPI.getAllProducts()
      ]);
      
      console.log("Mock Products:", mockProducts);
      console.log("Real Products:", realProducts);
      console.log("Arrays match:", JSON.stringify(mockProducts) === JSON.stringify(realProducts));
    } catch (error) {
      console.error("Error comparing getAllProducts:", error);
    }
  }

  static async compareProductById(id: number): Promise<void> {
    console.log(`=== Comparing getProductById(${id}) ===`);
    try {
      const [mockProduct, realProduct] = await Promise.all([
        ProductAPI.getProductById(id),
        RealProductAPI.getProductById(id)
      ]);
      
      console.log("Mock Product:", mockProduct);
      console.log("Real Product:", realProduct);
      console.log("Objects match:", JSON.stringify(mockProduct) === JSON.stringify(realProduct));
    } catch (error) {
      console.error("Error comparing getProductById:", error);
    }
  }

  static async compareProductsByCategory(categoryId: number): Promise<void> {
    console.log(`=== Comparing getProductsByCategory(${categoryId}) ===`);
    try {
      const [mockProducts, realProducts] = await Promise.all([
        ProductAPI.getProductsByCategory(categoryId),
        RealProductAPI.getProductsByCategory(categoryId)
      ]);
      
      console.log("Mock Products by Category:", mockProducts);
      console.log("Real Products by Category:", realProducts);
      console.log("Arrays match:", JSON.stringify(mockProducts) === JSON.stringify(realProducts));
    } catch (error) {
      console.error("Error comparing getProductsByCategory:", error);
    }
  }

  static async compareSearchProducts(query: string): Promise<void> {
    console.log(`=== Comparing searchProducts("${query}") ===`);
    try {
      const [mockProducts, realProducts] = await Promise.all([
        ProductAPI.searchProducts(query),
        RealProductAPI.searchProducts(query)
      ]);
      
      console.log("Mock Search Results:", mockProducts);
      console.log("Real Search Results:", realProducts);
      console.log("Arrays match:", JSON.stringify(mockProducts) === JSON.stringify(realProducts));
    } catch (error) {
      console.error("Error comparing searchProducts:", error);
    }
  }

  static async compareFeaturedProducts(): Promise<void> {
    console.log("=== Comparing getFeaturedProducts ===");
    try {
      const [mockProducts, realProducts] = await Promise.all([
        ProductAPI.getFeaturedProducts(),
        RealProductAPI.getFeaturedProducts()
      ]);
      
      console.log("Mock Featured Products:", mockProducts);
      console.log("Real Featured Products:", realProducts);
      console.log("Arrays match:", JSON.stringify(mockProducts) === JSON.stringify(realProducts));
    } catch (error) {
      console.error("Error comparing getFeaturedProducts:", error);
    }
  }

  static async compareRelatedProducts(productId: number): Promise<void> {
    console.log(`=== Comparing getRelatedProducts(${productId}) ===`);
    try {
      const [mockProducts, realProducts] = await Promise.all([
        ProductAPI.getRelatedProducts(productId),
        RealProductAPI.getRelatedProducts(productId)
      ]);
      
      console.log("Mock Related Products:", mockProducts);
      console.log("Real Related Products:", realProducts);
      console.log("Arrays match:", JSON.stringify(mockProducts) === JSON.stringify(realProducts));
    } catch (error) {
      console.error("Error comparing getRelatedProducts:", error);
    }
  }

  static async runAllComparisons(): Promise<void> {
    console.log("=== Starting API Comparison Tests ===");
    
    await this.compareAllProducts();
    await this.compareProductById(1);
    await this.compareProductsByCategory(1);
    await this.compareSearchProducts("smartphone");
    await this.compareFeaturedProducts();
    await this.compareRelatedProducts(1);
    
    console.log("=== API Comparison Tests Completed ===");
  }
}
