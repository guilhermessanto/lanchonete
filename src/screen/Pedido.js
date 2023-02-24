import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "react-native-currency-input";
import api from "../services/Api";
import { auth } from "../../firebaseConfig";

const Pedido = () => {
  const usuarioLogado = auth.currentUser;

  const [listaDePedidos, setListaDePedidos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const dados = await AsyncStorage.getItem("@carrinho");
        const itens = JSON.parse(dados);
        if (dados != null) {
          // agrupa itens duplicados
          const itensAgrupados = {};
          itens.forEach((item) => {
            if (itensAgrupados[item.id]) {
              itensAgrupados[item.id].quantidadeInicial +=
                item.quantidadeInicial;
            } else {
              itensAgrupados[item.id] = item;
            }
          });
          // define a nova lista de pedidos
          const novaListaDePedidos = Object.values(itensAgrupados);
          setListaDePedidos(novaListaDePedidos);
        }
      } catch (error) {
        console.log("Deu ruim no carregamento: " + error.message);
      }
    }
    carregarCarrinho();
  }, []);

  const excluirFavoritos = async () => {
    Alert.alert(
      "Exluir todos?",
      "Tem certeza que deseja excluir todos os favoritos?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return false;
          },
          style: "cancel", //somente ios
        },
        {
          text: "Confirmar",
          onPress: async () => {
            await AsyncStorage.removeItem("@carrinho");
            setListaDePedidos([]);
          },
          style: "destructive",
        },
      ]
    );
  };

  const finalizarCompra = async () => {
    try {
      // para cada produto no carrinho
      for (const produto of listaDePedidos) {
        // subtrai a quantidade inicial pela quantidade atual
        const quantidadeAtualizada =
          produto.quantidade - produto.quantidadeInicial;

        // envia a solicitação PATCH para atualizar a quantidade do produto no banco de dados
        await api.patch(`produtos/${produto.id}.json`, {
          quantidade: quantidadeAtualizada,
        });
      }
      const numero = Math.floor(Math.random() * 9000) + 1000;
      // salva os dados do pedido antes de limpá-lo do carrinho
      const dadosDoPedido = {
        listaDePedidos,
        //nomeCliente: usuarioLogado.displayName,
        numeroPedido: numero,
      };
      await AsyncStorage.setItem("@pedido", JSON.stringify(dadosDoPedido));
      // limpa o carrinho de compras
      await AsyncStorage.removeItem("@carrinho");
      setListaDePedidos([]);

      const resposta = await api.post("pedidos.json", {
        ...listaDePedidos,
        //nomeCliente: usuarioLogado.displayName,
        numeroPedido: numero,
      });
      // navega para a tela de confirmação de compra
      navigation.navigate("Comprovante", {
        ...dadosDoPedido,
        // nomeCliente: usuarioLogado.displayName,
        numeroPedido: numero,
      });
    } catch (error) {
      console.log("Deu ruim ao finalizar compra: " + error.message);
    }
  };
  const calcularValorTotal = () => {
    let valorTotal = 0;
    for (const produto of listaDePedidos) {
      valorTotal += produto.valor * produto.quantidadeInicial;
    }
    return valorTotal;
  };
  const total = calcularValorTotal(); // armazena o valor total em uma variável chamada "total"
  const formattedValue = formatNumber(total, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  });

  console.log(listaDePedidos);
  return (
    <SafeAreaView style={estilos.safeContainer}>
      <View style={estilos.container}>
        <View style={estilos.cabecalho}>
          <Text>Itens do Pedido </Text>
          <Pressable
            style={estilos.botaoExcluirTudo}
            onPress={excluirFavoritos}
          >
            <Text style={estilos.textoExcluirTudo}>
              <Ionicons name="trash-outline" size={16} /> Excluir itens
            </Text>
          </Pressable>
        </View>
      </View>
      <ScrollView style={estilos.scroll}>
        {listaDePedidos.map((produto) => (
          <View style={estilos.item} key={produto.id}>
            <Text style={estilos.texto}>{produto.quantidadeInicial}x</Text>
            <Text style={estilos.textoDois}>{produto.nome_produto}</Text>
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
      </ScrollView>
      <View style={estilos.areaFinal}>
        <Text style={estilos.textoDois}>Total: {formattedValue}</Text>
      </View>
      <View style={estilos.areaBotaoDois}>
        <Pressable style={estilos.botaoEnviar} onPress={finalizarCompra}>
          <Text style={estilos.textoBotao}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Pedido;

const estilos = StyleSheet.create({
  safeContainer: { flex: 1 },
  container: {
    padding: 8,
    backgroundColor: "white",
  },

  botaoExcluir: {
    backgroundColor: "#C0392B",
    padding: 8,
    borderRadius: 4,
  },
  cabecalho: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botaoExcluirTudo: {
    borderWidth: 1,
    borderColor: "#C0392B",
    padding: 8,
    borderRadius: 4,
  },
  textoExcluirTudo: { color: "#C0392B" },
  titulo: { flex: 1, fontSize: 14 },
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
  textoDois: {
    marginRight: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  textoTres: {
    fontSize: 20,
  },
  scroll: {
    flex: 0.5,
  },
  areaBotao: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  areaFinal: {
    flex: 0.1,
    padding: 15,
  },
  areaBotaoDois: {
    flex: 0.2,
    marginBottom: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoEnviar: {
    backgroundColor: "#FF6D38",
    paddingHorizontal: 100,
    borderRadius: 8,
  },
  textoBotao: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});
