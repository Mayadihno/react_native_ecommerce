import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigation";
import Home from "../screens/Home";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import Cart from "../screens/Cart";
import Deals from "../screens/Deals";
import Profile from "../screens/Profile";

export type TabsStackParamsObj = {
  Home: undefined;
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
  Profile: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParamsObj>();

export type TabsStackScreenProps<T extends keyof TabsStackParamsObj> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamsObj, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabNavigation = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TabsStack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color={"#008e97"} />
            ) : (
              <AntDesign name="home" size={24} color={"black"} />
            ),
        }}
      />
      <TabsStack.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="shopping-cart" size={24} color={"#008e97"} />
            ) : (
              <AntDesign name="shoppingcart" size={24} color={"black"} />
            ),
        }}
      />
      <TabsStack.Screen
        name="Deals"
        component={Deals}
        options={{
          tabBarLabel: "Deals",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="copy" size={24} color={"#008e97"} />
            ) : (
              <Ionicons name="copy-outline" size={24} color={"black"} />
            ),
        }}
      />
      <TabsStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="user" size={24} color={"#008e97"} />
            ) : (
              <Ionicons name="person" size={24} color={"black"} />
            ),
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabNavigation;
