import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TabsStackScreenProps } from "../navigations/TabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { CartProductListParams, CartState } from "../types/cartProductTypes";
import Header from "../components/Header";
import DisplayMessage from "../components/DisplayMessage";
import { Image } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { decreaseQty, increaseQty, removeFromCart } from "../redux/cartReducer";
import { UserType } from "../../UserContext";

export interface CartProductListParam {
  _id: string;
  price: number;
  quantity: number;
}

export default function Cart({
  route,
  navigation,
}: TabsStackScreenProps<"Cart">) {
  const goToPrevScreen = () => {
    navigation.goBack();
  };

  const cart = useSelector((state: CartState) => state.cart.cart);
  const dispatch = useDispatch();
  const [addToCart, setAddToCart] = useState(false);
  const [messsage, setMesssage] = useState("");
  const [displayMsg, setDisplayMsg] = useState(false);
  const totalPrice = cart.reduce(
    (a: number, b: CartProductListParam) => a + b.price * b.quantity,
    0
  );
  const { getUserId, setUserId } = useContext(UserType);
  const decreaseItem = (item: CartProductListParams) => {
    dispatch(decreaseQty(item));
    if (item.quantity--) {
      setMesssage("Product updated successfully");
      setDisplayMsg(true);
      setTimeout(() => {
        setDisplayMsg(false);
      }, 3000);
    }
  };

  const increaseItem = (item: CartProductListParams) => {
    dispatch(increaseQty(item));
    if (item.quantity++) {
      setMesssage("Product updated successfully");
      setDisplayMsg(true);
      setTimeout(() => {
        setDisplayMsg(false);
      }, 3000);
    }
  };
  const deleteItem = (item: CartProductListParams) => {
    dispatch(removeFromCart(item));
    if (item.quantity--) {
      setMesssage("Product remove successfully");
      setDisplayMsg(true);
      setTimeout(() => {
        setDisplayMsg(false);
      }, 3000);
    }
  };
  useEffect(() => {
    if (cart.length < 1) {
      setMesssage("Your cart is empty, Please add product to continue!");
      setDisplayMsg(true);
      setTimeout(() => {
        setDisplayMsg(false);
        navigation.navigate("Home");
      }, 3000);
    }
  }, [cart.length]);

  const handleCheckout = () => {
    if (getUserId === null) {
      navigation.navigate("Register", { screenTitle: "User Authentication" });
    } else {
      if (cart.length < 1) {
        setMesssage("Your cart is empty, Please add product to continue!");
        setDisplayMsg(true);
        setTimeout(() => {
          setDisplayMsg(false);
          navigation.navigate("Home");
        }, 3000);
      } else {
        navigation.navigate("checkoutInfo", {
          screenTitle: "Checkout Details",
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {displayMsg && <DisplayMessage message={messsage} />}
      <Header cartLength={cart.length} goToPrevious={goToPrevScreen} />
      <View style={{ backgroundColor: "#eee", borderColor: "#fff" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            &#8358;{totalPrice}
          </Text>
        </View>
        <Text style={{ marginHorizontal: 10 }}>Detail Available</Text>
        <Pressable
          onPress={handleCheckout}
          style={{
            backgroundColor: "#ffc72c",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text>Proceed to buy ({cart.length}) items</Text>
        </Pressable>
        <Text
          style={{
            height: 1,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 10,
          }}
        />
      </View>
      <ScrollView
        style={{ backgroundColor: "#fff", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 10 }}>
          {cart.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#fff",
                  marginVertical: 10,
                  borderBottomColor: "#f0f0f0",
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: item?.images[0] }}
                      style={{ width: 140, height: 140, resizeMode: "contain" }}
                    />
                  </View>
                  <View>
                    <Text style={{ width: 150, marginTop: 10 }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{ fontSize: 28, fontWeight: "bold", marginTop: 6 }}
                    >
                      &#8358;{item?.price}
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}
                  >
                    {item.quantity > 1 ? (
                      <Pressable
                        onPress={() => decreaseItem(item)}
                        style={{
                          backgroundColor: "#d0d0d0",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign
                          style={{ paddingLeft: 10 }}
                          size={22}
                          name="minus"
                          color={"black"}
                        />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => deleteItem(item)}
                        style={{
                          backgroundColor: "#d0d0d0",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign
                          style={{
                            paddingLeft: 1,
                          }}
                          size={22}
                          name="delete"
                          color={"black"}
                        />
                      </Pressable>
                    )}
                    <Pressable
                      style={{
                        backgroundColor: "#fff",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>{item.quantity}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => increaseItem(item)}
                      style={{
                        backgroundColor: "#d0d0d0",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <Feather
                        style={{
                          paddingLeft: 1,
                        }}
                        size={22}
                        name="plus"
                        color={"black"}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={{
                        backgroundColor: "#d0d0d0",
                        padding: 11,
                        marginLeft: 3,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
