import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ICatProps } from "../types/categoriesType";

export default function CategoryCard({
  item,
  catProps,
  catStylesProp,
}: ICatProps) {
  let isActive = item._id === catProps.activeCat;
  let activeButtonClass = isActive ? "orange" : "#fff";
  return (
    <View>
      {catProps.imageBg !== undefined ? (
        <View style={{ alignItems: "center" }}>
          <Pressable
            style={styles.imageContainer}
            key={item._id}
            onPress={catProps.onPress}
          >
            <ImageBackground
              source={{ uri: catProps?.imageBg }}
              style={styl(Number(catStylesProp?.height)).imageBg}
            >
              <Image
                source={{ uri: item?.images[0] }}
                style={
                  sty(
                    catStylesProp.height,
                    catStylesProp.width,
                    catStylesProp.radius
                  ).imageStyleProp
                }
                resizeMode={catStylesProp?.resizeMode}
              />
            </ImageBackground>
          </Pressable>
          <Text style={styles.catName}>{item?.name}</Text>
        </View>
      ) : (
        <TouchableOpacity
          key={item._id}
          onPress={catProps.onPress}
          style={[styles.touchable, { backgroundColor: activeButtonClass }]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item?.images[0] }}
              style={
                sty(
                  catStylesProp.height,
                  catStylesProp.width,
                  catStylesProp.radius
                ).imageStyleProp
              }
              resizeMode={catStylesProp?.resizeMode}
            />
          </View>
          <Text style={styles.catName}>{item?.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 50,
    padding: 3,
  },
  catName: {
    fontSize: 8,
    fontWeight: "bold",
  },
  touchable: {
    borderRadius: 20,
    alignItems: "center",
    padding: 5,
    margin: 3,
  },
});

const styl = (height: number) => ({
  imageBg: {
    height,
    borderRadius: 10,
  },
});

const sty = (height?: number, width?: number, radius?: number) => ({
  imageStyleProp: {
    height,
    borderRadius: radius,
    width,
  },
});
