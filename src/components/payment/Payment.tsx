import { View, Text } from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";

interface IPaymentMethod {
  selectedPaymentOption: string;
  setSelectedPaymentOption: () => void;
}

const Payment = ({
  selectedPaymentOption,
  setSelectedPaymentOption,
}: IPaymentMethod) => {
  return (
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
      {selectedPaymentOption === "Cash" ? (
        <Entypo
          onPress={() => setSelectedPaymentOption()}
          name="credit-card"
          size={24}
          color="black"
        />
      ) : (
        <FontAwesome
          onPress={() => setSelectedPaymentOption()}
          name="money"
          size={24}
          color="black"
        />
      )}
      <Text>Cash on Delivery</Text>
    </View>
  );
};

export default Payment;
