import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./Home";
import Pedido from "./Pedido";

import Login from "./Login";
import CriarConta from "./CriarConta";
import RecuperarSenha from "./RecuperarSenha";
import CadastrarProduto from "./CadastrarProduto";

import TelaBusca from "./TelaBusca";

import {
  NavegacaoHome,
  NavegacaoBusca,
  NavegacaoCarrinho,
  NavegacaoPerfil,
} from "../navegacao/Stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { NavegacaoCarrinhoTop } from "../navegacao/Top";
import PedidoAdmin from "./PedidoAdmin";
import { auth } from "../../firebaseConfig";

const Tab = createBottomTabNavigator();

const usuarioLogado = auth.currentUser;

const displayName = usuarioLogado ? usuarioLogado.displayName : null;
function Routes() {
  const [logado, setLogado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const usuarioLogado = auth.currentUser;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLogado(true);
        setIsAdmin(user.email === "guilherme@gmail.com");
      } else {
        setLogado(false);
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: `rgb(255, 109, 56)`,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={NavegacaoHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={"white"} />;
            }
            return <Ionicons name="home-outline" size={size} color={"black"} />;
          },
        }}
      />
      <Tab.Screen
        name="TelaBuscaTab"
        component={NavegacaoBusca}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="search" size={size} color={"white"} />;
            }
            return (
              <Ionicons name="search-outline" size={size} color={"black"} />
            );
          },
        }}
      />

      {isAdmin ? (
        <Tab.Screen
          name="PedidoAdmin"
          component={PedidoAdmin}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="cart" size={size} color={"white"} />;
              }
              return (
                <Ionicons name="cart-outline" size={size} color={"black"} />
              );
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="PedidoTab"
          component={NavegacaoCarrinhoTop}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="cart" size={size} color={"white"} />;
              }
              return (
                <Ionicons name="cart-outline" size={size} color={"black"} />
              );
            },
          }}
        />
      )}

      <Tab.Screen
        name="LoginTab"
        component={NavegacaoPerfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                  name="ios-person-circle"
                  size={size}
                  color={"white"}
                />
              );
            }
            return (
              <Ionicons
                name="ios-person-circle-outline"
                size={size}
                color={"black"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default Routes;
