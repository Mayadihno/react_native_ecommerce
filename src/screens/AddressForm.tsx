import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RootStackScreenProps } from "../navigations/RootNavigation";
import { UserType } from "../../UserContext";
import { customAxios } from "../middleware/HomeMiddleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import UserDataForm from "../components/UserDataForm";

export default function AddressForm({
  navigation,
  route,
}: RootStackScreenProps<"userAddress">) {
  const { getUserId, setUserId } = useContext(UserType);

  const { deliveryInfo, city, region, screenTitle } = route.params;
  const userAddressParams = { city, deliveryInfo, region };
  const [userAddressForm, setAddressForm] = useState(userAddressParams);
  const handleAddressFormChange = (
    text: string | number,
    fieldName: string
  ) => {
    setAddressForm({ ...userAddressForm, [fieldName]: text });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token: any = await AsyncStorage.getItem("authToken");
      setUserId(token);
    };
    fetchUser();
  }, []);

  const handleAddAddress = async () => {
    try {
      const res = await customAxios.post("/auth/addAddress", {
        getUserId,
        userAddressForm,
      });
      console.log(res);
      if (res) {
        setAddressForm(userAddressForm);
        Alert.alert("Address added successfully");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (error: any) {
      Alert.alert("Address failed to submit", error.message);
    }
  };
  const handleKeyboadDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}
    >
      <Header
        pageTitle={screenTitle}
        goToPrevious={() => navigation.goBack()}
      />
      <TouchableWithoutFeedback onPress={handleKeyboadDismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 50 }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041e42",
                }}
              >
                Add new address
              </Text>
            </View>

            <ScrollView>
              <View style={{ marginTop: 10 }}>
                <UserDataForm
                  label="Enter your deliveryInfo"
                  duration={300}
                  text={userAddressForm.deliveryInfo}
                  updateText={(text: string) =>
                    handleAddressFormChange(text, "deliveryInfo")
                  }
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <UserDataForm
                  label="Enter your city"
                  duration={300}
                  text={userAddressForm.city}
                  updateText={(text: string) =>
                    handleAddressFormChange(text, "city")
                  }
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <UserDataForm
                  label="Enter your region"
                  duration={300}
                  text={userAddressForm.region}
                  updateText={(text: string) =>
                    handleAddressFormChange(text, "region")
                  }
                />
              </View>
            </ScrollView>

            <View style={{ marginTop: 20 }}>
              <Pressable
                onPress={handleAddAddress}
                style={{
                  width: 200,
                  backgroundColor: "#febe10",
                  borderRadius: 6,
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Add Address
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
