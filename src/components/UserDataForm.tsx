import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useRef } from "react";

const width = (Dimensions.get("screen").width * 2) / 3 + 50;

interface IUserForm {
  label: string;
  duration?: number;
  labelColor?: string;
  text?: string;
  updateText?: (text: string) => void;
}
export default function UserDataForm({
  label,
  labelColor = "black",
  duration,
  text,
  updateText,
}: IUserForm) {
  const transY = useRef(new Animated.Value(0)).current;
  const borderWidth = useRef(new Animated.Value(1)).current;

  const transformAnimation = (totalValue: number) => {
    Animated.timing(transY, {
      toValue: totalValue,
      duration: duration ? duration : 1000,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
    Animated.timing(borderWidth, {
      toValue: totalValue,
      duration: duration ? duration : 1000,
      useNativeDriver: false,
    }).start();
  };

  const animatedBorderWidth = (totalValue: number) => {
    Animated.timing(borderWidth, {
      toValue: totalValue,
      duration: duration ? duration : 1000,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  const borderColor = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: ["black", "orange"],
    extrapolate: "clamp",
  });
  const labelColorAnimation = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: ["grey", labelColor],
    extrapolate: "clamp",
  });

  const labelFontSize = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: [14, 10],
    extrapolate: "clamp",
  });

  const onFocusHandler = () => {
    transformAnimation(-13);
    animatedBorderWidth(2);
  };

  const onBlurHandler = () => {
    if (text) return;
    transformAnimation(0);
    animatedBorderWidth(1);
  };

  const labelBackgroundColor = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: ["white", "#eee"],
    extrapolate: "clamp",
  });
  const labelPadding = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: [4, 0],
    extrapolate: "clamp",
  });

  const animateStyle = {
    transform: [
      {
        translateY: transY,
      },
    ],
  };
  return (
    <Animated.View
      style={[
        styles.container,
        { borderWidth: borderWidth, borderColor: borderColor },
      ]}
    >
      <Animated.View style={[styles.animatedStyle, animateStyle]}>
        <Animated.Text
          style={{
            color: labelColorAnimation,
            fontSize: labelFontSize,
            backgroundColor: labelBackgroundColor,
            padding: labelPadding,
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
      <TextInput
        value={text}
        onChangeText={updateText}
        blurOnSubmit
        autoCapitalize="none"
        editable={true}
        style={styles.input}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: width,
    alignSelf: "center",
  },
  input: {
    fontSize: 13,
    height: 35,
    color: "#000",
    padding: 10,
  },
  animatedStyle: {
    top: 5,
    left: 15,
    position: "absolute",
    borderRadius: 90,
    zIndex: 10,
  },
});
