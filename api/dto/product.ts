export interface ProductListParams {
  name: string;
  images: [string];
  price: number;
  oldPrice: number;
  inStock: boolean;
  description: string;
  quantity: number;
  isFeatured: boolean;
  category: string;
}
