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
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RootStackScreenProps } from "../navigations/RootNavigation";
import UserDataForm from "../components/UserDataForm";
import { customAxios } from "../middleware/HomeMiddleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback } from "react-native";
import Header from "../components/Header";
import { UserType } from "../../UserContext";

export default function Register({
  navigation,
  route,
}: RootStackScreenProps<"Register">) {
  const [showRegScreen, setshowRegScreen] = useState<boolean>(false);
  const { getUserId, setUserId } = useContext(UserType);

  const { email, firstName, confirmPassword, lastName, password, phoneNumber } =
    route.params;
  const userRegParams = {
    email,
    firstName,
    confirmPassword,
    lastName,
    password,
    phoneNumber,
  };
  const userLoginParams = {
    email,
    password,
  };
  const [userSignUpForm, setuserSignUpForm] = useState(userRegParams);
  const [userSignInForm, setuserSignInForm] = useState(userLoginParams);

  const handleSignUpTextChange = (text: string | number, fieldName: string) => {
    setuserSignUpForm({ ...userSignUpForm, [fieldName]: text });
  };
  const handleSignInTextChange = (text: string | number, fieldName: string) => {
    setuserSignInForm({ ...userSignInForm, [fieldName]: text });
  };

  const handleLogin = async () => {
    try {
      const res = await customAxios.post("/auth/login", userSignInForm);
      if (res) {
        await AsyncStorage.setItem("authToken", res.data.token);
        navigation.navigate("Cart", {});
        setuserSignInForm(userLoginParams);
        Alert.alert("User login successful");
      }
    } catch (error: any) {
      Alert.alert("User login failed", error.message);
    }
  };
  const handleRegister = async () => {
    if (userSignUpForm.password !== userSignUpForm.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    try {
      const res = await customAxios.post("/auth/createUser", userSignUpForm);
      if (res) {
        setshowRegScreen(!showRegScreen);
        setuserSignUpForm(userRegParams);
        Alert.alert("User registration successful");
      }
    } catch (error: any) {
      Alert.alert("User registration failed", error.message);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token: any = await AsyncStorage.getItem("authToken");
      setUserId(token);
    };
    fetchUser();
  }, []);

  const handleKeyboadDismiss = () => {
    Keyboard.dismiss();
  };

  const { screenTitle } = route.params;
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View></View>
            <KeyboardAvoidingView>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    marginTop: 12,
                    color: "#041e42",
                  }}
                >
                  {!showRegScreen
                    ? "Login to your account"
                    : "Register a new account"}
                </Text>
              </View>
              {showRegScreen && (
                <>
                  <ScrollView>
                    <View style={{ marginTop: 10 }}>
                      <UserDataForm
                        label="Enter your firstname"
                        duration={300}
                        text={userSignUpForm.firstName}
                        updateText={(text: string) =>
                          handleSignUpTextChange(text, "firstName")
                        }
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <UserDataForm
                        label="Enter your lastname"
                        duration={300}
                        text={userSignUpForm.lastName}
                        updateText={(text: string) =>
                          handleSignUpTextChange(text, "lastName")
                        }
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <UserDataForm
                        label="Enter your email"
                        duration={300}
                        text={userSignUpForm.email}
                        updateText={(text: string) =>
                          handleSignUpTextChange(text, "email")
                        }
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <UserDataForm
                        label="Enter your phone number"
                        duration={300}
                        text={userSignUpForm.phoneNumber}
                        updateText={(text: string) =>
                          handleSignUpTextChange(text, "phoneNumber")
                        }
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <UserDataForm
                        label="Enter your password"
                        duration={300}
                        text={userSignUpForm.password}
                        updateText={(text: string) =>
                          handleSignUpTextChange(text, "password")
                        }
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <UserDataForm
                        label="Enter your confirm password"
                        duration={300}
                        text={userSignUpForm.confirmPassword}
                        updateText={(text: string) =>
                          handleSignUpTextChange(text, "confirmPassword")
                        }
                      />
                    </View>
                    <View
                      style={{
                        margin: 13,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text>Already have an account?</Text>
                      <Pressable
                        onPress={() => setshowRegScreen(!showRegScreen)}
                      >
                        <Text
                          style={{
                            color: "#007fff",
                            fontWeight: "bold",
                            paddingLeft: 3,
                          }}
                        >
                          Login
                        </Text>
                      </Pressable>
                    </View>
                  </ScrollView>
                </>
              )}
              {!showRegScreen && (
                <View style={{ marginTop: 100 }}>
                  <View style={{ marginTop: 10 }}>
                    <UserDataForm
                      label="Enter your Email"
                      duration={300}
                      text={userSignInForm.email}
                      updateText={(text: string) =>
                        handleSignInTextChange(text, "email")
                      }
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <UserDataForm
                      label="Enter your password"
                      duration={300}
                      text={userSignInForm.password}
                      updateText={(text: string) =>
                        handleSignInTextChange(text, "password")
                      }
                    />
                  </View>
                  <View
                    style={{
                      margin: 13,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Keep me logged In</Text>
                    <Text style={{ color: "#007fff", fontWeight: "bold" }}>
                      Forget Password
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>Don't have account?</Text>
                    <Pressable onPress={() => setshowRegScreen(!showRegScreen)}>
                      <Text
                        style={{
                          color: "#007fff",
                          fontWeight: "bold",
                          paddingLeft: 3,
                        }}
                      >
                        Create Account
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}

              <View style={{ marginTop: 20 }}>
                {!showRegScreen ? (
                  <Pressable
                    onPress={handleLogin}
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
                      Login
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={handleRegister}
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
                      Create Acoount
                    </Text>
                  </Pressable>
                )}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
