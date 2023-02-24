import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageFixa from "../../../assets/imagens/logo/logoo.jpg";

const Slide = () => {
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.imagem}>
        <Image style={estilos.imgagemFixa} source={ImageFixa} />
      </View>
    </SafeAreaView>
  );
};

export default Slide;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagem: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  imgagemFixa: {
    maxWidth: 250,
    maxHeight: 180,
  },
});
