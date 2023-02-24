import AsyncStorage from "@react-native-async-storage/async-storage";
import Intl from "intl";
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatNumber } from "react-native-currency-input";

import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Itens2 = ({
  teste,
  acrescentar,
  diminuir,
  adicionarCarrinho,
  descricao,
  id,
  nome_produto,
  quantidade,
  valor,
  caminhoFoto,
}) => {
  const testeFuncao = () => {
    teste();
  };
  const adicionarCarrinhoDois = () => {
    if (quantidadeInicial > 0) {
      adicionarCarrinho({
        id,
        nome_produto,
        quantidade,
        valor,
        descricao,
        quantidadeInicial,
      });
    } else {
      Alert.alert("Por favor!", "Verifique se escolheu a quantidade de itens.");
    }
  };
  const diminuirItem = () => {
    diminuir();
  };
  const acrescentarItem = () => {
    acrescentar();
  };

  const [quantidadeInicial, setQuantidadeInicial] = useState(0);

  const increment = () => {
    if (quantidadeInicial + 1 > quantidade) return;
    setQuantidadeInicial(quantidadeInicial + 1);
  };
  const decrement = () => {
    if (quantidadeInicial - 1 < 0) return;
    setQuantidadeInicial(quantidadeInicial - 1);
  };
  const formattedValue = formatNumber(valor, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  });

  const navigation = useNavigation();
  const itemAvulso = () => {
    //const umProduto = nome_produto;
    const umProduto = {
      id: id,
      descricao: descricao,
      nome_produto: nome_produto,
      quantidade: quantidade,
      valor: valor,
      caminhoFoto: caminhoFoto,
    };
    navigation.navigate("ProdutoAvulsoStack", umProduto);
  };

  return (
    <TouchableOpacity key={id} onPress={itemAvulso}>
      <View style={estilos.content} key={id}>
        <View style={estilos.imagemContainer}>
          <Image style={estilos.imagem} source={{ uri: caminhoFoto }} />
        </View>

        <View style={estilos.produto}>
          <View style={estilos.alinhamento}>
            <Text style={estilos.titulo}>{nome_produto}</Text>

            {/* Carrinho de compras */}
            <Pressable onPress={adicionarCarrinhoDois}>
              <Text style={estilos.carrinho}>
                <Ionicons name="cart-outline" size={24} color="black" />
              </Text>
            </Pressable>
          </View>

          {/* contador de itens */}
          <View style={estilos.alinhamento}>
            <Text style={estilos.preco}>{formattedValue}</Text>
            <View style={estilos.contador}>
              <Pressable onPress={decrement}>
                <Ionicons name="remove" size={24} color="black" />
              </Pressable>
              <Text style={estilos.numeroContador}>{quantidadeInicial}</Text>
              <Pressable onPress={increment}>
                <Ionicons name="add" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Itens2;

const estilos = StyleSheet.create({
  container: {
    flex: 0.9,
    height: "100%",
  },

  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 125,
    backgroundColor: "#F7F7F7",
    marginBottom: 5,
  },
  imagemContainer: {
    marginLeft: 20,
    height: 90,
    width: 90,
    backgroundColor: "gray",
    alignSelf: "center",
    borderRadius: 7,
  },
  imagem: {
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 6,
  },
  produto: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: 20,
    paddingLeft: 8,
  },
  titulo: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
  },
  alinhamento: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carrinho: {
    marginEnd: 20,
  },
  contador: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
  },
  numeroContador: {
    paddingHorizontal: 4,
  },
  preco: {
    fontSize: 16,
  },
});
