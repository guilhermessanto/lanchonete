import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Itens2 from "./Itens2";

const ListaDeItens = ({ navigation }) => {
  const [produtos, setProdutos] = useState();

  useEffect(() => {
    async function todosProdutos() {
      try {
        const resposta = await api.get("/produtos.json");
        const dados = await resposta.data;
        let listaItens = [];
        for (const item in dados) {
          const objetoItem = {
            id: item,
            nome_produto: dados[item].nome_produto,
            descricao: dados[item].descricao,
            quantidade: dados[item].quantidade,
            valor: dados[item].valor,
            caminhoFoto: dados[item].caminhoFoto,
          };
          listaItens.push(objetoItem);
        }
        setProdutos(listaItens);
        //console.log(listaItens);
      } catch (error) {
        console.log("Deu ruim na busca da API: " + error.message);
      }
    }
    todosProdutos();
  }, []);

  //console.log(produtos);

  const adicionarCarrinho = async (produto) => {
    const listarCarrinho = await AsyncStorage.getItem("@carrinho");
    let listaDePedidos = JSON.parse(listarCarrinho);
    if (!listaDePedidos) {
      listaDePedidos = [];
    }
    listaDePedidos.push(produto);

    await AsyncStorage.setItem("@carrinho", JSON.stringify(listaDePedidos));
    Alert.alert("Favoritos", "Salvo com sucesso!");
    //console.log(listaDePedidos);
  };
  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={produtos}
        style={estilos.list}
        renderItem={({ item }) => (
          <Itens2
            adicionarCarrinho={adicionarCarrinho}
            descricao={item.descricao}
            id={item.id}
            nome_produto={item.nome_produto}
            quantidade={item.quantidade}
            valor={item.valor}
            caminhoFoto={item.caminhoFoto}
          />
        )}
        keyExtractor={(produtos) => produtos.id}
      />
    </SafeAreaView>
  );
};

export default ListaDeItens;

const estilos = StyleSheet.create({
  container: {
    flex: 0.9,
    height: "100%",
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 125,
    backgroundColor: "#F6F2D8",
    marginBottom: 5,
  },
  imagem: {
    marginLeft: 20,
    height: 90,
    width: 90,
    backgroundColor: "gray",
    alignSelf: "center",
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
});
