import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
interface IPaymentMethod {
  selectedAddress: string;
  cashPayment: () => void;
  total: number;
}

export default function CashPayment({
  cashPayment,
  selectedAddress,
  total,
}: IPaymentMethod) {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>Order now</Text>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 8,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 15, marginTop: 5, color: "gray" }}>
            Save 5% and never run out
          </Text>
          <Text style={{ fontSize: 15, marginTop: 5, color: "gray" }}>
            Turn on auto delivery
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={"#000"} />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 8,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          marginTop: 10,
        }}
      >
        <Text>Shipping to {selectedAddress}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>
            Item
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>
            {total}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "500" }}>
            Delivery
          </Text>
          <Text style={{ fontSize: 15, color: "gray" }}>&#8358; 0</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "500" }}>
            Order total
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>
            &#8358; {total}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 8,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 15, color: "gray" }}>Pay with</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>
          Pay on Delivery
        </Text>
      </View>
      <Pressable
        onPress={cashPayment}
        style={{
          backgroundColor: "green",
          padding: 14,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Place your order
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
