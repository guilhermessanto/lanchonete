import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
  Text,
} from "react-native";
import api from "../services/Api";
import Itens2 from "../components/listaDeItens/Itens2";
import CarrocelCategoria from "../components/carrocelCategoria/CarrocelCategoria";

const TelaBusca = ({ route }) => {
  const [searchText, setSearchText] = useState(route.params || "");
  const [produtos, setProdutos] = useState();
  const [list, setList] = useState();
  console.log(route.params);
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
            categoria: dados[item].categoria,

            caminhoFoto: dados[item].caminhoFoto,
          };
          listaItens.push(objetoItem);
        }
        setProdutos(listaItens);
        setList(listaItens);
      } catch (error) {
        console.log("Deu ruim na busca da API: " + error.message);
      }
    }
    todosProdutos();
  }, []);
  const adicionarCarrinho = async (produto) => {
    const listarCarrinho = await AsyncStorage.getItem("@carrinho");
    let listaDePedidos = JSON.parse(listarCarrinho);
    if (!listaDePedidos) {
      listaDePedidos = [];
    }
    listaDePedidos.push(produto);

    await AsyncStorage.setItem("@carrinho", JSON.stringify(listaDePedidos));
    Alert.alert("Carrinho", "Enviado com sucesso!");
  };
  /* filtro */

  const handleInputClick = () => {
    setSearchText("");
  };

  useEffect(() => {
    if (!searchText || !produtos) {
      setList(produtos || []);
    } else {
      setList(
        produtos.filter(
          (item) =>
            item.nome_produto.toLowerCase().indexOf(searchText.toLowerCase()) >
              -1 ||
            item.categoria.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText, produtos]);

  const enviarCategoria = (valor) => {
    setSearchText(valor);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.searchArea}>
        <TextInput
          style={estilos.input}
          placeholder="Pesquise um Produto"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(texto) => {
            setSearchText(texto);
          }}
          onFocus={handleInputClick}
        />
      </View>
      <CarrocelCategoria
        style={estilos.carrocel}
        enviarCategoria={enviarCategoria}
      />
      <Text style={estilos.textoBusca}>
        Você pesquisou por :
        <Text style={{ fontWeight: "bold" }}> {searchText}</Text>
      </Text>
      <FlatList
        data={list}
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

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#EBEBEB",
    margin: 20,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: "#000",
  },
  searchArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
    marginBottom: 50,
  },
  textoBusca: {
    fontSize: 16,
    paddingBottom: 4,
    marginLeft: 18,
  },
});

export default TelaBusca;
