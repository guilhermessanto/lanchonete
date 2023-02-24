import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const CarrocelCategoria = ({ enviarCategoria }) => {
  const navigation = useNavigation();

  const bebidas = "bebida";
  const salgados = "salgado";
  const sobremesas = "sobremesas";
  const doces = "doces";

  const enviarCategorias = (valor) => {
    if (enviarCategoria) {
      enviarCategoria(valor);
    }
    navigation.navigate("TelaBusca", valor);
  };
  return (
    <ScrollView
      style={estilos.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={estilos.actionButton}
        onPress={() => {
          enviarCategorias("bebida");
        }}
      >
        <View style={estilos.areaButton}>
          <Image
            style={estilos.icones}
            source={require("../../../assets/icones/cola.png")}
          />
        </View>
        <Text style={estilos.labelButton}>Bebidas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.actionButton}
        onPress={() => {
          enviarCategorias("salgado");
        }}
      >
        <View style={estilos.areaButton}>
          <Image
            style={estilos.icones}
            source={require("../../../assets/icones/hamburguer.png")}
          />
        </View>
        <Text style={estilos.labelButton}>Salgados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.actionButton}
        onPress={() => {
          enviarCategorias("sobremesas");
        }}
      >
        <View style={estilos.areaButton}>
          <Image
            style={estilos.icones}
            source={require("../../../assets/icones/rosquinha.png")}
          />
        </View>
        <Text style={estilos.labelButton}>Sobremesas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.actionButton}
        onPress={() => {
          enviarCategorias("doces");
        }}
      >
        <View style={estilos.areaButton}>
          <Image
            style={estilos.icones}
            source={require("../../../assets/icones/candy.png")}
          />
        </View>
        <Text style={estilos.labelButton}>Doces</Text>
      </TouchableOpacity>
      {/* 
      <TouchableOpacity style={estilos.actionButton}>
        <View style={estilos.areaButton}>
          <AntDesign name="ellipsis1" size={34} color="#000" />
        </View>
        <Text style={estilos.labelButton}>Outros</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default CarrocelCategoria;

const estilos = StyleSheet.create({
  container: {
    maxHeight: 95,
    marginBottom: 5,
    marginTop: 3,
    paddingEnd: 14,
    paddingStart: 14,
  },
  actionButton: {
    alignItems: "center",
    marginRight: 32,
  },
  areaButton: {
    backgroundColor: "#EBEBEB",
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    marginTop: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
  icones: {
    width: 32,
    height: 32,
  },
});
