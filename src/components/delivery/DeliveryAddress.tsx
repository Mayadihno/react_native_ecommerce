import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IAddressInfo, IDeliveryProps } from "../../types/deliveryTypes";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import OrderInfo from "./OrderInfo";

interface IDeliveryAddressProp {
  getUserId: string | null;
  selectedAdress: IAddressInfo | null;
  setSelectedAdress: () => void;
  index: number;
  address: IAddressInfo;
  setCurrentStep: () => void;
  data: IDeliveryProps;
}
const DeliveryAddress = ({
  address,
  getUserId,
  index,
  selectedAdress,
  setCurrentStep,
  setSelectedAdress,
  data,
}: IDeliveryAddressProp) => {
  return (
    <View key={index} style={styles.addressBox}>
      <Pressable style={styles.selectRadio}>
        {selectedAdress && selectedAdress._id === address._id ? (
          <FontAwesome5 name="dot-circle" size={25} color="grey" />
        ) : (
          <Entypo
            onPress={setSelectedAdress}
            name="circle"
            size={25}
            color="grey"
          />
        )}

        <OrderInfo data={data} addressInfo={address} getUserId={getUserId} />
      </Pressable>
      {selectedAdress && selectedAdress._id === address._id && (
        <Pressable
          onPress={setCurrentStep}
          style={{
            backgroundColor: "green",
            padding: 14,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Deliver to this address
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  addressBox: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    padding: 10,
    gap: 0,
    paddingBottom: 5,
    marginVertical: 7,
    borderRadius: 6,
  },
  selectRadio: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 17,
    marginVertical: 7,
    borderRadius: 6,
  },
});
