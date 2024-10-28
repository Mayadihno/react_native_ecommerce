import { userAddressInfo } from "./user";

export interface ProductItem {
  _id?: string;
  name?: string;
  images?: [string];
  price?: number;
  inStock?: boolean;
  quantity: number;
  category?: string;
  length?: number;
}

export interface CartItem {
  cart: ProductItem[];
}

export interface CartState {
  cart: {
    cart: ProductItem[];
    length: number;
  };
}

export interface TotalPrice {
  totalPrice: number;
}

export interface OrderParams {
  userId: string;
  cartItems: ProductItem[];
  totalPrice: TotalPrice;
  shippingAddress: userAddressInfo;
  paymentMethod: string;
}
