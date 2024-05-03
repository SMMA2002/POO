import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import Medicamentos from "./Medicamentos";
import Historial from "./Historial";
import Usuario from "./Usuario";
import Home from "./Home";

const Tab = createMaterialBottomTabNavigator();

const Menu = () => {
  //Cambiamos el sombreado del icono de navegación
  //¡¡¡¡¡Las Tab.Screen son los iconos de la barra de menu
  //esas serian las pestañas generales
  const theme = useTheme();
  theme.colors.secondaryContainer = "#e5e5e5";
  return (
    <Tab.Navigator
      tabBarActiveBackgroundColor="#fff"
      activeColor="#000"
      inactiveColor="#95a5a6"
      barStyle={styles.navigationBar}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="#BCD7FC" size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Medicamento"
        component={Medicamentos}
        options={{
          tabBarLabel: "Medicamento",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="pill"
              color="#BCD7FC"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Historial"
        component={Historial}
        options={{
          tabBarLabel: "Historial",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="hospital-building"
              color="#BCD7FC"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={Usuario}
        options={{
          tabBarLabel: "Cuenta",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color="#BCD7FC"
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: "#fff",
    paddingBottom: 5,
    borderTopWidth: 0.5,
    borderTopColor: "#000",
  },
});

export default Menu;