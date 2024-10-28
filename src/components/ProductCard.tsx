import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import React from "react";
import { IProductProps } from "../types/productTypes";

export default function ProductCard({
  item,
  pStylesProp,
  productProps,
}: IProductProps) {
  return (
    <View
      style={
        sty(
          pStylesProp?.width,
          pStylesProp?.marginHorizontal,
          pStylesProp?.marginBottom
        ).pCardContainer
      }
    >
      <ImageBackground
        source={{ uri: productProps?.imageBg }}
        style={styl(pStylesProp?.height).imageBg}
        imageStyle={{ borderRadius: 6 }}
      >
        <Pressable
          key={item?._id}
          onPress={productProps.onPress}
          style={{ alignItems: "center" }}
        >
          <Image
            source={{ uri: item?.images[0] }}
            resizeMode={pStylesProp.resizeMode}
            style={{ height: "100%", width: 70 }}
          />
        </Pressable>
      </ImageBackground>
      <Text
        numberOfLines={1}
        style={{
          textAlign: "center",
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 5,
        }}
      >
        {item.name}
      </Text>
      {productProps.percentageWidth !== undefined && (
        <>
          <View style={{ marginHorizontal: 5 }}>
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontSize: 12 }}>{item?.quantity} items left</Text>
            </View>
            <View
              style={sProg(productProps?.percentageWidth).progressBarContainer}
            >
              <View style={sProg(productProps?.percentageWidth).progressBar} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const sProg = (percentageWidth?: number) => ({
  progressBar: {
    width: percentageWidth,
    height: 6,
    borderRadius: 99,
    backgroundColor: "orange",
  },
  progressBarContainer: {
    width: 200,
    height: 6,
    backgroundColor: "silver",
    borderRadius: 99,
    marginTop: 7,
  },
});

const sty = (
  width?: number,
  marginHorizontal?: number,
  marginBottom?: number
) => ({
  pCardContainer: {
    width: width,
    marginHorizontal: marginHorizontal,
    marginBottom: marginBottom,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 9,
    backgroundColor: "white",
  },
});

const styl = (height?: number) => ({
  imageBg: {
    height,
    borderRadius: 10,
  },
});
