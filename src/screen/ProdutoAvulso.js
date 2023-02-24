import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";

import { formatNumber } from "react-native-currency-input";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProdutoAvulso = ({ route }) => {
  const produto = route.params;
  // console.log(produto);
  const [loading, setLoading] = useState(false);

  const adicionarCarrinho = async () => {
    const listarCarrinho = await AsyncStorage.getItem("@carrinho");
    let listaDePedidos = JSON.parse(listarCarrinho);
    if (!listaDePedidos) {
      listaDePedidos = [];
    }
    const produtoNoCarrinho = listaDePedidos.find((p) => p.id === produto.id);
    if (produtoNoCarrinho) {
      // Se o produto já está no carrinho, atualiza a quantidade
      produtoNoCarrinho.quantidade += quantidadeInicial;
    } else {
      // Se o produto ainda não está no carrinho, adiciona ele com a quantidade inicial
      listaDePedidos.push({
        ...produto,
        quantidadeInicial: quantidadeInicial,
      });
    }
    console.log(listaDePedidos);

    await AsyncStorage.setItem("@carrinho", JSON.stringify(listaDePedidos));
    Alert.alert("Favoritos", "Salvo com sucesso!");
  };
  const [quantidadeInicial, setQuantidadeInicial] = useState(0);

  const increment = () => {
    if (quantidadeInicial + 1 > produto.quantidade) return;
    setQuantidadeInicial(quantidadeInicial + 1);
  };
  const decrement = () => {
    if (quantidadeInicial - 1 < 0) return;
    setQuantidadeInicial(quantidadeInicial - 1);
  };

  const formattedValue = formatNumber(produto.valor, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  });

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.boxImagem}>
        <Image style={estilos.imagem} source={{ uri: produto.caminhoFoto }} />
      </View>
      <View style={estilos.marginGeral}>
        <View>
          <Text style={estilos.titulo}>{produto.nome_produto}</Text>
        </View>

        <View>
          <Text style={estilos.subTitulo}>Descrição:</Text>
          <ScrollView>
            <Text> {produto.descricao}</Text>
          </ScrollView>
        </View>
      </View>
      <View>
        <Text style={estilos.precoDois}>
          Preço: <Text style={estilos.preco}> {formattedValue}</Text>
        </Text>
      </View>
      <View style={estilos.alinhamento}>
        <View style={estilos.contador}>
          <Pressable onPress={decrement}>
            <Ionicons name="remove" size={24} color="black" />
          </Pressable>
          <Text style={estilos.numeroContador}>{quantidadeInicial}</Text>
          <Pressable onPress={increment}>
            <Ionicons name="add" size={24} color="black" />
          </Pressable>
        </View>

        <View style={estilos.botaoAtualizar}>
          <Pressable style={estilos.botaoAtualizar} onPress={adicionarCarrinho}>
            <Text style={estilos.textoBotao}>Adicionar</Text>
          </Pressable>
          {loading && <ActivityIndicator size="large" color="blue" />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProdutoAvulso;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
  },
  marginGeral: {
    flex: 0.9,
    paddingLeft: 10,
  },

  boxImagem: {
    flex: 0.9,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  imagem: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "90%",
    backgroundColor: "white",
    marginTop: 5,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 15,
  },

  subTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },

  alinhamento: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 0.3,
    marginBottom: 50,
  },

  carrinho: {
    marginEnd: 20,
  },
  contador: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    height: 30,
  },
  numeroContador: {
    paddingHorizontal: 4,
  },
  preco: {
    fontSize: 16,
    color: "#ff6d38",
  },
  precoDois: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },

  botaoAtualizar: {
    margin: 14,
    borderRadius: 6,
    backgroundColor: "#ff6d38",
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
