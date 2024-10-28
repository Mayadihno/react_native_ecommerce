import { NavigatorScreenParams } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import TabNavigation, { TabsStackParamsObj } from "./TabNavigation";
import ProductDetails from "../screens/ProductDetails";
import Register from "../screens/Register";
import Delivery from "../screens/Delivery";
import AddressForm from "../screens/AddressForm";

export type RootStackObjParams = {
  TabsStack: NavigatorScreenParams<TabsStackParamsObj>;
  Cart: {
    _id?: string;
    name?: string;
    images?: [string];
    price?: number;
    oldPrice?: number;
    inStock?: boolean;
    color?: string;
    size?: string;
    description?: string;
    quantity?: number;
    category?: string;
    screenTitle?: string;
  };
  Deals: undefined;
  productDetails: {
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
    screenTitle?: string;
  };
  Register: {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    screenTitle?: string;
  };
  Login: {
    email?: string;
    password?: string;
  };
  checkoutInfo: {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    screenTitle?: string;
    deliveryInfo?: string;
    region?: string;
    city?: string;
  };
  userAddress: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    screenTitle?: string;
    deliveryInfo?: string;
    region?: string;
    city?: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackObjParams>();

export type RootStackScreenProps<T extends keyof RootStackObjParams> =
  NativeStackScreenProps<RootStackObjParams, T>;

function RootNavigation() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="TabsStack" component={TabNavigation} />
      <RootStack.Screen name="productDetails" component={ProductDetails} />
      <RootStack.Screen name="Register" component={Register} />
      <RootStack.Screen name="checkoutInfo" component={Delivery} />
      <RootStack.Screen name="userAddress" component={AddressForm} />
    </RootStack.Navigator>
  );
}

export default RootNavigation;
