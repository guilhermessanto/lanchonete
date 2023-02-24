import {
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  Alert,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import ImageFixa from "../../assets/imagens/logo/logoo.jpg";

import { auth } from "../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const corPrimaria = "#5451a6";

const RecuperarSenha = (props) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const recuperarSenha = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Recuperar senha", "Verifique sua caixa de entrada");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.imagem}>
        <Image style={estilos.imgagemFixa} source={ImageFixa} />
      </View>

      <View style={estilos.caixaInput}>
        <TextInput
          style={estilos.inPut}
          placeholder="Digite seu E-mail:"
          onChangeText={(valor) => setEmail(valor)}
        />
      </View>

      <View style={estilos.botaoCadastrar}>
        <Pressable style={estilos.botaoCadastrar} onPress={recuperarSenha}>
          <Text style={estilos.textoBotao}>Enviar</Text>
        </Pressable>
        {loading && <ActivityIndicator size="large" color="blue" />}
      </View>
    </SafeAreaView>
  );
};

export default RecuperarSenha;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },

  titulo: {
    textAlign: "left",
    marginVertical: 8,
    color: corPrimaria,
    fontSize: 20,
    marginBottom: 30,
    backgroundColor: "ghostwhite",
    borderRadius: 5,
  },

  imagem: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "20%",
    backgroundColor: "white",
    /* flex: 0.5, */
    marginLeft: 140,
    marginBottom: 50,
    marginTop: 25,
  },

  imgagemFixa: {
    maxWidth: 200,
    maxHeight: 180,
  },

  caixaInput: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },

  inPut: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  botaoCadastrar: {
    alignItems: "center",
    justifyContent: "center",
    margin: 14,
    borderRadius: 6,
    backgroundColor: corPrimaria,
    width: "93%",
    alignSelf: "center",
  },

  textoBotao: {
    color: "white",
  },
});
