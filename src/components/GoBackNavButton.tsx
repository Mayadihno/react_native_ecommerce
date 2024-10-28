import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IGoBack {
  onPress?: () => void;
}

export default function GoBackNavButton({ onPress }: IGoBack) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "white",
        padding: 3,
        borderRadius: 50,
      }}
    >
      <Ionicons name="chevron-back-outline" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
