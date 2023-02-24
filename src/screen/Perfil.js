import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

const Perfil = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const usuarioLogado = auth.currentUser;
  console.log(usuarioLogado.email);

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.opcPerfil}>
        <Pressable
          onPress={() => {
            navigation.navigate("AtualizarPerfil");
          }}
        >
          <Text>Atualizar perfil</Text>
          <Text>_____________________________________________</Text>
        </Pressable>
      </View>
      {usuarioLogado.email === "guilherme@gmail.com" ? (
        <View style={estilos.opcProduto}>
          <Pressable
            onPress={() => {
              navigation.navigate("CadastrarProduto");
            }}
          >
            <Text>Adicionar produto</Text>
            <Text>_____________________________________________</Text>
          </Pressable>
        </View>
      ) : (
        <Text />
      )}

      <View style={estilos.opcSair}>
        <Pressable onPress={logout}>
          <Text style={estilos.termo}>Sair</Text>
          <Text>_____________________________________________</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },

  opcPerfil: {
    marginTop: "50%",
    margin: 14,
    flex: 0.1,
  },
  opcProduto: {
    margin: 14,
    flex: 0.5,
  },

  opcSair: {
    flex: 0.7,
    margin: 14,
    marginBottom: 55,
    flexDirection: "column-reverse",
  },
});
