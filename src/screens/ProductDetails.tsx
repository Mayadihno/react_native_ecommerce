import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../navigations/RootNavigation";
import Header from "../components/Header";
import { ImageBackground } from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CartProductListParams, CartState } from "../types/cartProductTypes";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../redux/cartReducer";
import DisplayMessage from "../components/DisplayMessage";

const { width } = Dimensions.get("window");
const height = (width * 110) / 120;

export default function ProductDetails({
  navigation,
  route,
}: RootStackScreenProps<"productDetails">) {
  const { _id, images, name, quantity, price, description, color } =
    route.params;
  const items = route.params;
  const goToCartScreen = () => {
    if (cart.length < 1) {
      setMesssage("Cart is empty, Please add product to continue");
      setDisplayMsg(true);
      setTimeout(() => {
        setDisplayMsg(false);
      }, 3000);
      return;
    } else {
      navigation.navigate("Cart", {});
    }
  };
  const goToPrevScreen = () => {
    navigation.goBack();
  };
  const cart = useSelector((state: CartState) => state.cart.cart);
  const dispatch = useDispatch();
  const [addToCart, setAddToCart] = useState(false);
  const [messsage, setMesssage] = useState("");
  const [displayMsg, setDisplayMsg] = useState(false);

  const handleAddToCart = (product: CartProductListParams) => {
    if (product.quantity < 1) {
      setMesssage("This Product is out of stock");
      setDisplayMsg(true);
      setTimeout(() => {
        setDisplayMsg(false);
      }, 3000);
      return;
    } else {
      const findItem = cart.find((item) => item._id === product._id);
      if (findItem) {
        setMesssage("Product already added to cart");
        setDisplayMsg(true);
        setTimeout(() => {
          setDisplayMsg(false);
        }, 3000);
      } else {
        setAddToCart(!addToCart);
        dispatch(addProductToCart(product));
        setMesssage("Product added cart");
        setDisplayMsg(!displayMsg);
        setTimeout(() => {
          setDisplayMsg(!displayMsg);
        }, 3000);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {displayMsg && <DisplayMessage message={messsage} />}
      <Header
        goToCartScreen={goToCartScreen}
        cartLength={cart.length}
        goToPrevious={goToPrevScreen}
      />
      <ScrollView style={{ backgroundColor: "#eee" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground style={{ width, height, marginTop: 25 }}>
            <View
              style={{
                padding: 3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#c60630",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  30% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#e0e0e0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color={"black"}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <Image
                source={{ uri: images[0] }}
                style={{ resizeMode: "contain", width: 350, height: 200 }}
              />
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#e0e0e0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 0, paddingTop: 2 }}
                name="heart"
                size={20}
                color={"black"}
              />
            </View>
          </ImageBackground>
        </ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 7,
            borderColor: "#fff",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
              &#8358;{price}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginTop: 6,
                color: "green",
              }}
            >
              {quantity !== 0 ? "Instock" : "Out of stock"}
            </Text>
          </View>
          <Text style={{ height: 1, borderWidth: 1, borderColor: "#d0d0d0" }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Color</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{color}</Text>
          </View>
          <View style={{ marginTop: 30, marginHorizontal: 6 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "bold" }}>
              Delivery
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderWidth: 7,
              borderColor: "#fff",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#000" }}>
              Delivery is Available
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                alignItems: "center",
              }}
            >
              <Ionicons name="location" size={24} color={"black"} />
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                Deliverd to Ibadan- Nigeria
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 30, marginHorizontal: 6 }}>
            <Text style={{ fontSize: 13, color: "gray", fontWeight: "500" }}>
              Product Details
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderWidth: 7,
              borderColor: "#fff",
            }}
          >
            <Text style={{ color: "gray", fontWeight: "500" }}>
              Descriptions
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#000",
                fontWeight: "500",
                marginVertical: 5,
              }}
            >
              {description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <Pressable
          style={{
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
          onPress={() => handleAddToCart(items)}
        >
          <View>
            {addToCart ? (
              <Text
                style={{ color: "green", fontSize: 28, fontWeight: "bold" }}
              >
                Add to Cart
              </Text>
            ) : (
              <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
                Add to Cart
              </Text>
            )}
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
