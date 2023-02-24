import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Pedido from "../screen/Pedido";
import Comprovante from "../screen/Comprovante";
import TelaBusca from "../screen/TelaBusca";
import { NavegacaoComprovante, NavegacaoPedido } from "./Stack";
import PedidoAdmin from "../screen/PedidoAdmin";
import { auth } from "../../firebaseConfig";
const Top = createMaterialTopTabNavigator();
const usuarioLogado = auth.currentUser;
export function NavegacaoCarrinhoTop() {
  return (
    <Top.Navigator screenOptions={{ headerShown: false }}>
      <Top.Screen
        name="PedidoTop"
        component={Pedido}
        options={{ title: "Pedido" }}
      />
      <Top.Screen
        options={{ headerShown: false }}
        name="Comprovante"
        component={Comprovante}
      />
    </Top.Navigator>
  );
}
