import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatNumber } from "react-native-currency-input";
import { SafeAreaView } from "react-native-safe-area-context";

const Comprovante = ({ route }) => {
  const pedido = route.params;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const dados = await AsyncStorage.getItem("@pedido");
        const itens = JSON.parse(dados);

        setProdutos(itens);
      } catch (error) {
        console.log("Deu ruim no carregamento: " + error.message);
      }
    }
    carregarCarrinho();
  }, []);
  const calcularValorTotal = () => {
    let total = 0;
    produtos?.listaDePedidos?.forEach((produto) => {
      total += produto.valor * produto.quantidadeInicial;
    });
    return total;
  };

  console.log(produtos);
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.textoView}>
        <Text style={estilos.textoDois}>
          Olá
          <Text style={estilos.textoNome}>
            {produtos.nomeCliente ? produtos.nomeCliente : ""}
          </Text>
        </Text>
        <Text style={estilos.textoPedido}>
          Pedido: #{produtos.numeroPedido}
        </Text>
      </View>
      <View style={estilos.scroll}>
        <ScrollView>
          {produtos?.listaDePedidos?.map((produto) => (
            <View style={estilos.item} key={produto.id}>
              <Text style={estilos.texto}>{produto.quantidadeInicial}x</Text>
              <Text style={estilos.textoDois}>
                {produto.nome_produto ? produto.nome_produto : ""}
              </Text>
              <Text style={estilos.textoTres}>
                {formatNumber(produto.valor, {
                  separator: ",",
                  prefix: "R$ ",
                  precision: 2,
                  delimiter: ".",
                  signPosition: "beforePrefix",
                })}
              </Text>
            </View>
          ))}
          {!produtos?.listaDePedidos && (
            <Text>Não há produtos para exibir</Text>
          )}
        </ScrollView>
      </View>
      <View style={estilos.total}>
        <Text style={estilos.textoDois}>
          Total:{" "}
          {formatNumber(calcularValorTotal(), {
            separator: ",",
            prefix: "R$ ",
            precision: 2,
            delimiter: ".",
            signPosition: "beforePrefix",
          })}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Comprovante;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EBEBEB",
    padding: 20,
  },
  texto: {
    fontSize: 20,
    color: "#FF6D38",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  textoView: {
    marginLeft: 20,
  },
  textoNome: {
    fontSize: 23,
    color: "#FF6D38",
    /*  fontWeight: "bold", */
  },
  textoDois: {
    marginRight: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  textoPedido: {
    fontSize: 22,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "bold",
  },
  textoTres: {
    fontSize: 20,
  },
  total: {
    flex: 0.2,
  },
  scroll: {
    flex: 0.8,
  },
});
