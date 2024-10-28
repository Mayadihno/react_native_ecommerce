import { Alert } from "react-native";
import { CartProductListParam } from "../screens/Cart";
import { IAddressInfo, IDeliveryProps } from "../types/deliveryTypes";
import { customAxios } from "./HomeMiddleware";

interface IAddressProp {
  setAddress: React.Dispatch<React.SetStateAction<IDeliveryProps>>;
  getUserId: string | null;
}

interface IPlaceOrderProps {
  orderObj: {
    userId: string | null;
    totalPrice: number;
    cartItems: CartProductListParam[];
    paymentMethod: string;
    shippingAddress: IAddressInfo | null;
  };
}

export const fetchUserAddress = async ({
  setAddress,
  getUserId,
}: IAddressProp) => {
  try {
    const res = await customAxios.get(`/auth/getUserAddress/${getUserId}`);
    const { data } = res.data;

    setAddress(data);
  } catch (error) {
    console.log(error);
  }
};

export const placeOrderByCash = async ({ orderObj }: IPlaceOrderProps) => {
  try {
    const res = await customAxios.post(`/order/createOrder`, orderObj);
    if (res.status === 200) {
      Alert.alert("Order created successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
