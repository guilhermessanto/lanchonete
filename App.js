import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./src/screen/Home";
import TelaBusca from "./src/screen/TelaBusca";
import Pedido from "./src/screen/Pedido";
/* import Perfil from "./src/screen/Perfil"; */
import Login from "./src/screen/Login";
import Routes from "./src/screen/routes";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar barStyle="default" backgroundColor={"#000"} />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
