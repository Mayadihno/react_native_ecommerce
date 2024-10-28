import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
interface IPaymentMethod {
  selectedPaymentOption: string;
  setSelectedPaymentOption: () => void;
  handlePayment: () => void;
}

export default function CardPayment({
  selectedPaymentOption,
  setSelectedPaymentOption,
  handlePayment,
}: IPaymentMethod) {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 8,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginTop: 12,
        }}
      >
        {selectedPaymentOption === "Card" ? (
          <FontAwesome name="money" size={24} color="black" />
        ) : (
          <Entypo
            onPress={() => {
              setSelectedPaymentOption();
              Alert.alert("Pay with debit card, pay online", "", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel"),
                },
                {
                  text: "Proceed",
                  onPress: () => handlePayment(),
                },
              ]);
            }}
            name="credit-card"
            size={24}
            color="black"
          />
        )}
        <Text>Card Payment</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
