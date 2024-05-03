import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./screens/Menu";
import 'react-native-gesture-handler';
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import Cuenta from "./screens/Cuenta";
import AgregarEnfermedad from "./screens/AgregarEnfermedad";
import AgregarAlergias from "./screens/AgregarAlergias";
import AgregarMedico from "./screens/AgregarMedicos";
import AgregarMedicamento from "./screens/AgregarMedicamento";
import Enfermedades from "./screens/Enfermedades";
import Alergias from "./screens/Alergias";
import Medicos from "./screens/Medicos";
import EditarCuenta from "./screens/EditarCuenta";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: false,
          headerTitleAlign: 'center', // Centra los títulos
        }}
      >
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Cuenta" component={Cuenta} />
        <Stack.Screen name="AgregarEnfermedad" component={AgregarEnfermedad} />
        <Stack.Screen name="AgregarAlergias" component={AgregarAlergias} />
        <Stack.Screen name="AgregarMedico" component={AgregarMedico} />
        <Stack.Screen name="AgregarMedicamento" component={AgregarMedicamento} />
        <Stack.Screen name="Enfermedades" component={Enfermedades} />
        <Stack.Screen name="Alergias" component={Alergias} />
        <Stack.Screen name="Medicos" component={Medicos} />
        <Stack.Screen name="EditarCuenta" component={EditarCuenta} />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "MediPro",
            headerTitleAlign: "center",

            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
