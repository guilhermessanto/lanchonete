import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

const corPrimaria = "#5451a6";

const Menu = ({ navigation }) => {
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.viewRodape}>
        <Pressable style={estilos.botaoRodape}>
          <Ionicons
            style={estilos.icone}
            name="home-outline"
            size={20}
            color="white"
          />
          <Text style={estilos.texto}>Inicio</Text>
        </Pressable>

        <Pressable style={estilos.botaoRodape}>
          <Ionicons
            style={estilos.icone}
            name="search"
            size={20}
            color="white"
          />
          <Text style={estilos.texto}>Buscar</Text>
        </Pressable>

        <Pressable style={estilos.botaoRodape}>
          <Ionicons
            style={estilos.icone}
            name="cart-outline"
            size={20}
            color="white"
          />
          <Text style={estilos.texto}>Pedido</Text>
        </Pressable>

        <Pressable
          style={estilos.botaoRodape}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Ionicons
            style={estilos.icone}
            name="ios-person-circle-outline"
            size={20}
            color="white"
          />
          <Text style={estilos.texto}>Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Menu;

const estilos = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewRodape: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: corPrimaria,
  },
  botaoRodape: {
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: corPrimaria,
  },
  icone: {
    alignItems: "center",
    marginTop: 9,
  },
  texto: {
    color: "white",
    padding: 12,
  },
});
