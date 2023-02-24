import {
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  Alert,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import ImageFixa from "../../assets/imagens/logo/logoo.jpg";

import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const corPrimaria = "#5451a6";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const fazerLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Você deve preencher todos os campos");
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.replace("HomeTab");
      })
      .catch((error) => {
        /* console.log(error); */
        let mensagem;
        switch (error.code) {
          case "auth/user-not-found":
            mensagem = "Usuário não encontrado";
            break;
          case "auth/wrong-password":
            mensagem = "Senha incorreta";
            break;
          default:
            mensagem = "Houve um erro, tente novamente mais tarde";
            break;
        }
        Alert.alert("Atenção!!", mensagem);
      })
      .finally(() => {
        setLoading(false);
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
          placeholder="Digite seu e-mail:"
          onChangeText={(valor) => setEmail(valor)}
        />
      </View>

      <View style={estilos.caixaInput}>
        <TextInput
          style={estilos.inPut}
          placeholder="Digite sua senha:"
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
      </View>

      <View style={estilos.botaoEntrar}>
        <Pressable style={estilos.botaoEntrar} onPress={fazerLogin}>
          <Text style={estilos.textoBotao}>ENTRAR</Text>
        </Pressable>
        {loading && <ActivityIndicator size="large" color="blue" />}
      </View>

      <View style={estilos.txtSenha}>
        <Text
          style={estilos.senha}
          onPress={() => {
            navigation.navigate("RecuperarSenha");
          }}
        >
          Esqueci a senha ?
        </Text>
        <Text>_____________________________________________</Text>
      </View>

      <View style={estilos.botaoCriar}>
        <Pressable
          style={estilos.botaoCriar}
          onPress={() => {
            navigation.navigate("CriarConta");
          }}
        >
          <Text style={estilos.textoBotao}>Criar nova conta</Text>
        </Pressable>
        {loading && <ActivityIndicator size="large" color="blue" />}
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
    marginBottom: 60,
    marginTop: 25,
  },
  imgagemFixa: {
    maxWidth: 280,
    maxHeight: 220,
  },

  /*   titulo: {
    marginTop: 50,
    textAlign: "center",
    marginVertical: 8,
    color: corPrimaria,
    fontSize: 30,
    marginBottom: 30,
  }, */

  inPut: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },

  caixaInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  botaoEntrar: {
    alignItems: "center",
    justifyContent: "center",
    margin: 14,
    borderRadius: 6,
    backgroundColor: corPrimaria,
    width: "93%",
    alignSelf: "center",
  },

  botaoCriar: {
    alignItems: "center",
    justifyContent: "center",
    margin: 14,
    borderRadius: 6,
    backgroundColor: corPrimaria,
    width: 250,
    alignSelf: "center",
  },
  textoBotao: { color: "white" },

  txtSenha: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
