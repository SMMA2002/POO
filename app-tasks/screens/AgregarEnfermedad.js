import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../credenciales'; // Importamos auth desde las credenciales
import { getFirestore, collection, addDoc } from 'firebase/firestore';
 
const db = getFirestore();

export default function AgregarEnfermedad(props) {
  const initialState = {
    nombre:''
  }
  
  const [state, setState] = useState(initialState)

  const handleChangeText = (value, name)=>{
      setState({...state, [name]:value})
  }

  const AgregarEnfermedad = async () => {
      try {
          if (!auth.currentUser) {
              Alert.alert('Error', 'No se pudo encontrar el usuario autenticado.');
              return;
          }
  
          await addDoc(collection(db, 'enfermedades'), {
              userId: auth.currentUser.uid,
              ...state
          });
  
          Alert.alert('Guardado con éxito');
          props.navigation.navigate('Enfermedades');

      } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Hubo un error al guardar.');
      }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder='nombre'
                onChangeText={(value)=>handleChangeText(value, 'nombre')}
                value={state.nombre}
            />
            
            <TouchableOpacity style={styles.button} onPress={AgregarEnfermedad}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
form: {
    width: '80%',
},
input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
},
button: {
    backgroundColor: '#4D8BFA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
},
});
