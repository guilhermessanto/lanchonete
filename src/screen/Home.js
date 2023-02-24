import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ListaDeItens from "../components/listaDeItens/ListaDeItens";
import Slide from "../components/slide/Slide";
import CarrocelCategoria from "../components/carrocelCategoria/CarrocelCategoria";
const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.slide}>
        <Slide />
      </View>
      <View style={estilos.carrocel}>
        <CarrocelCategoria />
      </View>
      <View style={estilos.ListaDeItens}>
        <ListaDeItens />
      </View>
      {/*   <View style={estilos.menu}>
        <Menu navigation={props.navigation} />
      </View> */}
    </SafeAreaView>
  );
};

export default Home;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1.3,
  },
  carrocel: {
    flex: 0.6,
  },
  ListaDeItens: {
    flex: 2.5,
  },
  menu: {
    flex: 0.4,
  },
});
