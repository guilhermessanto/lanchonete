//import { sendSignInLinkToEmail, updateProfile } from "firebase/auth";
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
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import ImageFixa from "../../assets/imagens/logo/logoo.jpg";

import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const corPrimaria = "#5451a6";

const CriarConta = (props) => {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmesenha, setConfirmeSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const cadastrar = () => {
    if (!nome) {
      Alert.alert("Ops!", "Você deve preencher seu Nome");
      return;
    }

    if (!email) {
      Alert.alert("Ops!", "Você deve preencher E-mail");
      return;
    }

    if (!senha) {
      Alert.alert("Ops!", "Você deve preencher Senha");
      return;
    }

    if (!confirmesenha) {
      Alert.alert("Ops!", "Você deve preencher Confirmação da Senha");
      return;
    }

    if (senha !== confirmesenha) {
      Alert.alert("Ops!", "Divergência entre senhas");
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: nome,
        });

        Alert.alert("Cadastro criado com Sucesso", "Deseja entrar?", [
          {
            text: "Não, me deixe aqui mesmo",
            onPress: () => {
              navigation.replace("CriarConta");
            },
            style: "cancel",
          },
          {
            text: "Sim, bora lá!",
            onPress: () => {
              navigation.replace("HomeTab");
            },
            style: "default",
          },
        ]);
      })

      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/email-already-in-use":
            mensagem = "E-mail já cadastrado";
            break;

          case "auth/weak-password":
            mensagem = "Senha deve ter pelo menos 6 dígitos";
            break;

          case "auth/invalid-email":
            mensagem = "Endereço de e-mail inválido!";
            break;

          default:
            mensagem = "Algo deu errado .. tente novamente!";
            break;
        }
        Alert.alert("Atenção!", mensagem);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView>
        <View style={estilos.imagem}>
          <Image style={estilos.imgagemFixa} source={ImageFixa} />
        </View>

        <View style={estilos.caixaInput}>
          <TextInput
            style={estilos.inPut}
            placeholder="Digite seu Nome:"
            onChangeText={(valor) => setNome(valor)}
          />
        </View>

        <View style={estilos.caixaInput}>
          <TextInput
            style={estilos.inPut}
            placeholder="Digite seu E-mail:"
            keyboardType="email-address"
            onChangeText={(valor) => setEmail(valor)}
          />
        </View>

        <View style={estilos.caixaInput}>
          <TextInput
            style={estilos.inPut}
            placeholder="Digite sua Senha:"
            secureTextEntry
            onChangeText={(valor) => setSenha(valor)}
          />
        </View>

        <View style={estilos.caixaInput}>
          <TextInput
            style={estilos.inPut}
            placeholder="Confirme sua Senha:"
            secureTextEntry
            onChangeText={(valor) => setConfirmeSenha(valor)}
          />
        </View>

        <View style={estilos.textoTermo}>
          <Pressable
            onPress={() => {
              navigation.navigate("TermoPrivacidade");
            }}
          >
            <Text style={estilos.termo}>[ x ] Termos de Privacidade</Text>
          </Pressable>
        </View>

        <View style={estilos.botaoCadastrar}>
          <Pressable style={estilos.botaoCadastrar} onPress={cadastrar}>
            <Text style={estilos.textoBotao}>Cadastrar</Text>
          </Pressable>
          {loading && <ActivityIndicator size="large" color="blue" />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CriarConta;

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
    /*  flex: 0.5, */
    marginLeft: 140,
    marginBottom: 50,
    marginTop: 25,
  },

  imgagemFixa: {
    maxWidth: 200,
    maxHeight: 180,
  },

  inPut: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  caixaInput: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },

  botaoEntrar: {
    alignItems: "center",
    justifyContent: "center",
    margin: 14,
    borderRadius: 6,
    backgroundColor: corPrimaria,
    width: 325,
    alignSelf: "center",
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

  textoTermo: {
    marginTop: 10,
    margin: 14,
  },

  termo: {
    textDecorationLine: "underline",
  },

  botao: {
    marginTop: 30,
    backgroundColor: corPrimaria,
    width: 250,
    alignSelf: "center",
  },
});
