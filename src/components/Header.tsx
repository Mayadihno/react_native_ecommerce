import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import GoBackNavButton from "./GoBackNavButton";
interface IHeaderParams {
  goToPrevious?: () => void;
  search?: () => void;
  cartLength?: number;
  goToCartScreen?: () => void;
  pageTitle?: string;
}
export default function Header({
  goToCartScreen,
  goToPrevious,
  search,
  cartLength,
  pageTitle,
}: IHeaderParams) {
  const [searchInput, setSearchInput] = useState("");
  return (
    <View
      style={{
        backgroundColor: "#000",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {pageTitle !== undefined ? (
        <>
          <Pressable style={{ marginHorizontal: 10 }} onPress={goToPrevious}>
            <Ionicons name="arrow-back" size={30} color={"#fff"} />
          </Pressable>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, color: "#fff", alignItems: "center" }}>
              {pageTitle}
            </Text>
          </View>

          <Pressable onPress={search} style={{ marginHorizontal: 10 }}>
            <AntDesign name="search1" size={25} color={"white"} />
          </Pressable>
        </>
      ) : (
        <>
          <GoBackNavButton onPress={goToPrevious} />
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "white",
              borderRadius: 10,
              height: 38,
              flex: 1,
            }}
          >
            <Pressable style={{ padding: 10 }} onPress={search}>
              <AntDesign name="search1" size={20} />
            </Pressable>
            <TextInput
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="Search product"
              style={{ fontSize: 18 }}
            />
          </Pressable>
          <Pressable onPress={goToCartScreen}>
            <View style={styles.cartNum}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {cartLength}
              </Text>
            </View>
            <MaterialIcons
              name="shopping-cart"
              size={25}
              color={"white"}
              style={{ padding: 3, marginTop: 3 }}
            />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartNum: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "orange",
    borderRadius: 20,
    width: 20,
    height: 20,
    zIndex: 999,
    color: "white",
  },
});
