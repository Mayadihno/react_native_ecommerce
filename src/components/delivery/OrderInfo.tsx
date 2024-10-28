import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IAddressInfo, IDeliveryProps } from "../../types/deliveryTypes";
import { Entypo } from "@expo/vector-icons";

interface IOrderInfo {
  getUserId?: string | null;
  addressInfo: IAddressInfo;
  setSelectedAddress?: () => void;
  onPress?: () => void;
  data: IDeliveryProps;
}

const OrderInfo = ({
  addressInfo,
  getUserId,
  setSelectedAddress,
  onPress,
  data,
}: IOrderInfo) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#d0d0d0",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingTop: 17,
        marginVertical: 7,
        borderRadius: 6,
      }}
    >
      <View>
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {data.firstName} {data.lastName}
          </Text>
          <Entypo name="location-pin" size={24} color="red" />
        </View>
        <Text style={{ fontSize: 15, color: "#181818" }}>
          {addressInfo.region} {addressInfo.city}
        </Text>
        <Text style={{ fontSize: 15, color: "#181818" }}>
          {addressInfo.region} {addressInfo.city}
        </Text>
        <Text style={{ fontSize: 15, color: "#181818" }}>
          {addressInfo.deliveryInfo}
        </Text>
        <Text style={{ fontSize: 15, color: "#181818" }}>
          Mobile Number: {data.phoneNumber}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 7,
          }}
        >
          <Pressable
            onPress={onPress}
            style={{
              backgroundColor: "#f5f5f5",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              borderWidth: 0.9,
              borderColor: "#d0d0d0",
            }}
          >
            <Text>Edit</Text>
          </Pressable>
          <Pressable
            onPress={onPress}
            style={{
              backgroundColor: "#f5f5f5",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              borderWidth: 0.9,
              borderColor: "#d0d0d0",
            }}
          >
            <Text>Remove</Text>
          </Pressable>
          <Pressable
            onPress={onPress}
            style={{
              backgroundColor: "#f5f5f5",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              borderWidth: 0.9,
              borderColor: "#d0d0d0",
            }}
          >
            <Text>Set as Default</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OrderInfo;

const styles = StyleSheet.create({
  
});
