import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { useInterval } from "../hooks/UseIntervals";

export interface IImageProp {
  image: number;
  id: number;
}
interface ImageSliderProps {
  image: IImageProp[];
}
const Max_Width = Dimensions.get("screen").width;
export default function ImageSlider({ image }: ImageSliderProps) {
  const animation = useRef(new Animated.Value(0));
  const [currentState, setCurrentState] = useState(0);

  const handleAnimation = () => {
    let newCurrentImage = currentState + 1;
    if (newCurrentImage >= image.length) {
      newCurrentImage = currentState * 0;
    }
    Animated.spring(animation.current, {
      toValue: -(Dimensions.get("screen").width * newCurrentImage),
      useNativeDriver: true,
    }).start();

    setCurrentState(newCurrentImage);
  };

  useInterval(() => handleAnimation(), 3000);
  return (
    <View>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: animation.current }] },
        ]}
      >
        {image.map((image) => (
          <Image key={image.id} source={image.image} style={styles.image} />
        ))}
      </Animated.View>
      <View style={styles.indicatorContainer}>
        {image.map((image, index) => (
          <View
            key={image.id}
            style={[
              styles.indicator,
              index === currentState
                ? styles.activeIndicator
                : styles.indicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 6,
  },
  image: {
    width: Max_Width,
    height: 220,
    resizeMode: "contain",
    borderWidth: 7,
    borderColor: "white",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    width: Max_Width,
    zIndex: 999,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 7.5,
    backgroundColor: "#eee",
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "silver",
    marginBottom: 0,
  },
  activeIndicator: {
    backgroundColor: "orange",
  },
});
