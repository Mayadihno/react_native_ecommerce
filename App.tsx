import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/navigations/RootNavigation";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import { UserContext } from "./UserContext";

export default function App() {
  return (
    <Provider store={store}>
      <UserContext>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <RootNavigation />
            <StatusBar backgroundColor={"#008e97"} />
          </NavigationContainer>
        </PersistGate>
      </UserContext>
    </Provider>
  );
}
