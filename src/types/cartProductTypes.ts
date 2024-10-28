export interface CartProductListParams {
  _id: string;
  name: string;
  images: [string];
  price: number;
  oldPrice?: number;
  inStock?: boolean;
  color?: string;
  size?: string;
  description?: string;
  quantity: number;
  category?: string;
}

export interface CartItems {
  cart: CartProductListParams[];
}
export interface CartState {
  cart: {
    cart: CartProductListParams[];
    length: number;
  };
}
