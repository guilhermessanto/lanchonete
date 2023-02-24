import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screen/Home";
import TelaBusca from "../screen/TelaBusca";
import Pedido from "../screen/Pedido";

import Login from "../screen/Login";
import CriarConta from "../screen/CriarConta";
import Perfil from "../screen/Perfil";
import RecuperarSenha from "../screen/RecuperarSenha";
import TermoPrivacidade from "../screen/TermoPrivacidade";

import Comprovante from "../screen/Comprovante";

import AtualizarPerfil from "../screen/AtualizarPerfil";
import CadastrarProduto from "../screen/CadastrarProduto";
import { auth } from "../../firebaseConfig";
import { useState } from "react";
import ProdutoAvulso from "../screen/ProdutoAvulso";
import PedidoAdmin from "../screen/PedidoAdmin";

const Stack = createNativeStackNavigator();

export function NavegacaoHome() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TelaBusca"
        component={TelaBusca}
      />
      <Stack.Screen
        options={{ headerShown: true, title: "Produto" }}
        name="ProdutoAvulsoStack"
        component={ProdutoAvulso}
      />
    </Stack.Navigator>
  );
}
export function NavegacaoBusca({ route }) {
  console.log(route.params);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="TelaBusca"
        component={TelaBusca}
      />
      <Stack.Screen
        options={{ headerShown: true, title: "Produto" }}
        name="ProdutoAvulsoStack"
        component={ProdutoAvulso}
      />
    </Stack.Navigator>
  );
}
export function NavegacaoCarrinho() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pedido" component={Pedido} />
    </Stack.Navigator>
  );
}
export function NavegacaoCarrinhoAdmin() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PedidoAdmin" component={PedidoAdmin} />
    </Stack.Navigator>
  );
}
export function NavegacaoPerfil() {
  const usuarioLogado = auth.currentUser;
  if (!usuarioLogado) {
    return (
      <Stack.Navigator>
        {}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{ title: "Criar Conta" }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{ title: "Recuperar Senha" }}
        />

        <Stack.Screen
          name="TermoPrivacidade"
          component={TermoPrivacidade}
          options={{ title: "Termo de Privacidade" }}
        />
        <Stack.Screen name="HomeTab" component={Home} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AtualizarPerfil"
          component={AtualizarPerfil}
          options={{ title: "Atualizar Perfil" }}
        />
        <Stack.Screen
          name="CadastrarProduto"
          component={CadastrarProduto}
          options={{ title: "Cadastro Produto" }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }
}
export function NavegacaoPedido() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PedidoStack"
        component={Pedido}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComprovanteStack"
        component={Comprovante}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export function NavegacaoComprovante() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ComprovanteStack"
        component={Comprovante}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
