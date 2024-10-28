export interface ProductListParams {
  _id: string;
  name: string;
  images: [string];
  price: number;
  oldPrice?: number;
  inStock: boolean;
  color?: string;
  size?: string;
  description?: string;
  quantity: number;
  category?: string;
}

export interface FetchProductParams {
  data: {
    Products: ProductListParams[];
    data: ProductListParams[];
  };
}
