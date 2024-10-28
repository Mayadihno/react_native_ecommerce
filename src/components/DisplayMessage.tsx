import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface IDisplayMsg {
  message: string;
  visible?: () => void;
}
export default function DisplayMessage({ message, visible }: IDisplayMsg) {
  return (
    <View
      style={{
        zIndex: 999,
        backgroundColor: "green",
        top: 8,
        padding: 15,
        position: "absolute",
        marginTop: 15,
        width: "100%",
      }}
    >
      <Text
        style={{
          fontStyle: "normal",
          fontSize: 13,
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
