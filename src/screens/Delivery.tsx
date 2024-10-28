import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RootStackScreenProps } from "../navigations/RootNavigation";
import Header from "../components/Header";
import { ScrollView } from "react-native";
import { IAddressInfo, IDeliveryProps } from "../types/deliveryTypes";
import { UserType } from "../../UserContext";
import DeliveryAddress from "../components/delivery/DeliveryAddress";
import { fetchUserAddress, placeOrderByCash } from "../middleware/Delivery";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Payment from "../components/payment/Payment";
import CardPayment from "../components/payment/CardPayment";
import CashPayment from "../components/payment/CashPayment";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../types/cartProductTypes";
import { CartProductListParam } from "./Cart";
import { emptyCart } from "../redux/cartReducer";
import { Paystack } from "react-native-paystack-webview";
import { customAxios } from "../middleware/HomeMiddleware";

export default function Delivery({
  navigation,
  route,
}: RootStackScreenProps<"checkoutInfo">) {
  const cart = useSelector((state: CartState) => state.cart.cart);
  const { screenTitle } = route.params;

  const steps = [
    {
      title: "Address",
      content: "Address Form",
    },
    {
      title: "Delivery",
      content: "Delivery Options",
    },
    {
      title: "Payment",
      content: "Payment Details",
    },
    {
      title: "Address",
      content: "Order Summary",
    },
  ];

  const { getUserId } = useContext(UserType);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [address, setAddress] = useState<IDeliveryProps>({});
  const [selectedAddress, setSelectedAddress] = useState<IAddressInfo | null>(
    null
  );
  const [option, setOption] = useState<boolean>(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const goToAddress = () => {
    navigation.navigate("userAddress", { screenTitle: "User Adress Details" });
  };
  const total = cart.reduce(
    (a: number, b: CartProductListParam) => a + b.price * b.quantity,
    0
  );
  useEffect(() => {
    fetchUserAddress({ setAddress, getUserId });
  }, []);

  const dispatch = useDispatch();
  const orderObj = {
    cartItems: cart,
    userId: getUserId,
    totalPrice: total,
    paymentMethod: selectedPaymentOption,
    shippingAddress: selectedAddress,
  };

  const [pay, setPay] = useState<boolean>(false);
  const newEmail = address.email;

  const handlePayment = () => {
    if (newEmail && total) {
      setPay(true);
    } else {
      Alert.alert("Please fill all fields");
    }
  };

  const handleCashPayment = () => {
    placeOrderByCash({ orderObj: orderObj });
    dispatch(emptyCart());
    navigation.navigate("TabsStack", { screen: "Home" });
  };

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <Header
        pageTitle={screenTitle}
        goToPrevious={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
      >
        <View style={styles.stepContainer}>
          <View style={styles.stepContent}>
            {steps.map((step, index) => (
              <View key={index}>
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: "green" },
                      index <= currentStep && { backgroundColor: "green" },
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    index < currentStep && { backgroundColor: "green" },
                  ]}
                >
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      <FontAwesome name="check" size={24} color="white" />
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text style={{ textAlign: "center", marginTop: 8 }}>
                  {step.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {currentStep === 0 && (
          <View style={{ marginHorizontal: 5 }}>
            <View style={{ padding: 10 }}>
              <Pressable onPress={goToAddress} style={styles.addressButton}>
                <Text style={styles.addAddressText}>Add Address</Text>
              </Pressable>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
              Select Delivery Address
            </Text>
            <Pressable>
              {address &&
                address?.addressInfo?.map(
                  (item: IAddressInfo, index: number) => (
                    <DeliveryAddress
                      key={index}
                      index={index}
                      address={item}
                      getUserId={getUserId}
                      setCurrentStep={() => setCurrentStep(1)}
                      selectedAdress={selectedAddress}
                      setSelectedAdress={() => setSelectedAddress(item)}
                      data={address}
                    />
                  )
                )}
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 5,
                gap: 7,
                borderColor: "grey",
                borderWidth: 1,
              }}
            ></View>
          </View>
        )}
        {currentStep === 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Select Delivery Address
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 8,
                gap: 5,
                borderColor: "grey",
                marginTop: 10,
                borderWidth: 1,
              }}
            >
              {option ? (
                <FontAwesome5 name="dot-circle" size={24} color="green" />
              ) : (
                <Entypo
                  name="circle"
                  onPress={() => setOption(!option)}
                  size={24}
                  color="grey"
                />
              )}
              <Text style={{ flex: 1 }}>
                <Text style={{ color: "green", fontWeight: "500" }}>
                  Tomorrow by 10pm
                </Text>{" "}
                - Free delivery
              </Text>
            </View>
            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: "green",
                padding: 14,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Continue
              </Text>
            </Pressable>
          </View>
        )}

        {currentStep === 2 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Select Payment Method
            </Text>
            <Payment
              selectedPaymentOption={selectedPaymentOption}
              setSelectedPaymentOption={() => setSelectedPaymentOption("Cash")}
            />
            <CardPayment
              setSelectedPaymentOption={() => setSelectedPaymentOption("Card")}
              selectedPaymentOption={selectedPaymentOption}
              handlePayment={handlePayment}
            />

            {/* paystack payment */}
            {pay && (
              <Paystack
                amount={total}
                billingEmail={newEmail !== undefined ? newEmail : ""}
                billingName={address.firstName}
                phone={address.phoneNumber}
                currency="NGN"
                paystackKey="pk_test_678936f27fe8828b2edfcbc6f67d5c262f504048"
                onCancel={(res: any) => console.log(res)}
                onSuccess={async (res: any) => {
                  const responseObj = res["transactionRef"]["message"];
                  if (responseObj === "Approved") {
                    await customAxios.post(`/order/createOrder`, orderObj);
                    Alert.alert("Order created successfully");
                    dispatch(emptyCart());
                    navigation.navigate("TabsStack", { screen: "Home" });
                  }
                }}
                autoStart={pay}
              />
            )}
            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: "green",
                padding: 14,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Continue
              </Text>
            </Pressable>
          </View>
        )}

        {currentStep === 3 && selectedPaymentOption === "Cash" && (
          <CashPayment
            cashPayment={handleCashPayment}
            selectedAddress={address.firstName + "" + address.lastName}
            total={total}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentWrapper: {
    backgroundColor: "#eee",
    marginTop: 0,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  stepContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  addressButton: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: "#d0d0d0",
  },
  addAddressText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
