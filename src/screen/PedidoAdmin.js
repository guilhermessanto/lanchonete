import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../services/Api";

const PedidoAdmin = () => {
  const [produtos, setProdutos] = useState();
  useEffect(() => {
    async function todosProdutos() {
      try {
        const resposta = await api.get("/pedidos.json");
        const dados = await resposta.data;

        setProdutos(dados);
        //console.log(listaItens);
      } catch (error) {
        console.log("Deu ruim na busca da API: " + error.message);
      }
    }
    todosProdutos();
  }, []);
  console.log(produtos);
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Imagine uma tela de Pedidos aqui </Text>
    </View>
  );
};

export default PedidoAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: { fontSize: 24 },
});
