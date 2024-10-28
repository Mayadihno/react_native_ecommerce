import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TabsStackScreenProps } from "../navigations/TabNavigation";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import { sliderImage } from "../static/banner";
import { Text } from "react-native";
import { ProductListParams } from "../types/Hometypes";
import CategoryCard from "../components/CategoryCard";
import { useFocusEffect } from "@react-navigation/native";
import {
  fetchCategories,
  fetchFeaturedProduct,
  fetchProductByCatId,
  fetchTrendingDeals,
} from "../middleware/HomeMiddleware";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { CartState } from "../types/cartProductTypes";

const productWidth = Dimensions.get("screen").width / 4 - 10;
const featuredproductWidth = Dimensions.get("screen").width / 3 - 10;

export default function Home({
  navigation,
  route,
}: TabsStackScreenProps<"Home">) {
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getCategoryCatId, setGetCategoryCatId] = useState<ProductListParams[]>(
    []
  );
  const [trendingDeals, setTrendingDeals] = useState<ProductListParams[]>([]);
  const [featuredproduct, setFeaturedproduct] = useState<ProductListParams[]>(
    []
  );
  const [activeCat, setActiveCat] = useState<string>("");
  const [bgImg, setBgImg] = useState<string>(
    "https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg"
  );

  const cart = useSelector((state: CartState) => state.cart.cart);
  const goToCartScreen = () => {
    if (cart.length < 1) {
      Alert.alert("Cart is empty");
    } else {
      navigation.navigate("Cart", {});
    }
  };
  const goToPrevScreen = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchCategories({ setGetCategory });
    fetchTrendingDeals({ setTrendingDeals });
    fetchFeaturedProduct({ setFeaturedproduct });
  }, []);
  useEffect(() => {
    fetchProductByCatId({ setGetCategoryCatId, catId: activeCat });
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      fetchProductByCatId({ setGetCategoryCatId, catId: activeCat });
      fetchTrendingDeals({ setTrendingDeals });
      fetchFeaturedProduct({ setFeaturedproduct });
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 0 : 0,
        flex: 1,
      }}
    >
      <Header
        goToCartScreen={goToCartScreen}
        cartLength={cart.length}
        goToPrevious={goToPrevScreen}
      />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ImageSlider image={sliderImage} />
        </ScrollView>
        <View
          style={{
            backgroundColor: "#eee",
            borderWidth: 3,
            marginTop: 10,
            borderColor: "#fff",
          }}
        />
        <Text style={{ fontSize: 25, marginHorizontal: 5, paddingLeft: 5 }}>
          New Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginTop: 4 }}
        >
          {getCategory.map((item) => (
            <CategoryCard
              item={{ _id: item._id, name: item.name, images: item.images }}
              key={item._id}
              catStylesProp={{
                height: 50,
                width: 55,
                resizeMode: "cover",
                radius: 20,
              }}
              catProps={{
                activeCat: activeCat,
                onPress: () => {
                  setActiveCat(item._id);
                },
              }}
            />
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            backgroundColor: "#0abab5",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
              padding: 10,
              color: "white",
            }}
          >
            Product from selected category
          </Text>
          <Pressable>
            <Text
              style={{
                fontSize: 13,
                padding: 5,
                color: "white",
                fontWeight: "bold",
              }}
            >
              See all
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderWidth: 7,
            borderColor: "white",
            flexWrap: "wrap",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getCategoryCatId.map((item) => (
              <CategoryCard
                item={{ _id: item._id, name: item.name, images: item.images }}
                key={item._id}
                catStylesProp={{
                  height: 100,
                  width: 100,
                  resizeMode: "contain",
                  radius: 2,
                }}
                catProps={{
                  activeCat: activeCat,
                  onPress: () => {
                    navigation.navigate("productDetails", {
                      _id: item._id,
                      name: item.name,
                      images: item.images,
                      price: item.price,
                      quantity: item.quantity,
                      description: item.description,
                    });
                  },
                  imageBg: bgImg,
                }}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#0abab5",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
              padding: 10,
              color: "white",
            }}
          >
            Trending Deals of the week
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderWidth: 7,
            borderColor: "white",
            flexWrap: "wrap",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingDeals.map((item, index) => (
              <ProductCard
                item={{
                  name: item.name,
                  images: item.images,
                  price: item.price,
                  quantity: item.quantity,
                  _id: item._id,
                }}
                key={index}
                pStylesProp={{
                  resizeMode: "contain",
                  width: productWidth,
                  height: 80,
                  marginBottom: 5,
                  marginHorizontal: 3,
                }}
                productProps={{
                  imageBg: bgImg,
                  onPress: () => {
                    navigation.navigate("productDetails", {
                      _id: item._id,
                      name: item.name,
                      images: item.images,
                      price: item.price,
                      quantity: item.quantity,
                      description: item.description,
                    });
                  },
                }}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            backgroundColor: "#0abab5",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
              padding: 10,
              color: "white",
            }}
          >
            Limited Deals
          </Text>
          <Pressable>
            <Text
              style={{
                fontSize: 13,
                padding: 5,
                color: "white",
                fontWeight: "bold",
              }}
            >
              See all
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderWidth: 7,
            borderColor: "white",
            flexWrap: "wrap",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredproduct.map((item, index) => (
              <ProductCard
                item={{
                  name: item.name,
                  images: item.images,
                  price: item.price,
                  quantity: item.quantity,
                  _id: item._id,
                }}
                key={index}
                pStylesProp={{
                  resizeMode: "contain",
                  width: featuredproductWidth,
                  height: 115,
                  marginBottom: 5,
                  marginHorizontal: 5,
                }}
                productProps={{
                  imageBg: bgImg,
                  percentageWidth: (item.quantity / 50) * 100,
                  onPress: () => {
                    navigation.navigate("productDetails", {
                      _id: item._id,
                      name: item.name,
                      images: item.images,
                      price: item.price,
                      quantity: item.quantity,
                      description: item.description,
                    });
                  },
                }}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
