import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../credenciales'; // Importamos auth desde las credenciales
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

export default function Cuenta(props) {
    const initialState = {
        nombre:'',
        fecha:'',
        genero:'',
        email:'',
        telefono:'',
        peso:'',
        altura:''
    }

    const [state, setState] = useState(initialState)

    const handleChangeText = (value, name)=>{
        setState({...state, [name]:value})
    }

    const saveUsuario = async () => {
        try {
            if (!auth.currentUser) {
                Alert.alert('Error', 'No se pudo encontrar el usuario autenticado.');
                return;
            }

            await addDoc(collection(db, 'usuarios'), {
                userId: auth.currentUser.uid,
                ...state
            });
            Alert.alert('Guardado con éxito');
            props.navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un error al registrar. Por favor, inténtalo de nuevo.');
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
                <TextInput
                    style={styles.input}
                    placeholder='fecha'
                    onChangeText={(value)=>handleChangeText(value, 'fecha')}
                    value={state.fecha}
                />
                <TextInput
                    style={styles.input}
                    placeholder='genero'
                    onChangeText={(value)=>handleChangeText(value, 'genero')}
                    value={state.genero}
                />
                <TextInput
                    style={styles.input}
                    placeholder='email'
                    onChangeText={(value)=>handleChangeText(value, 'email')}
                    value={state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='telefono'
                    onChangeText={(value)=>handleChangeText(value, 'telefono')}
                    value={state.telefono}
                />
                <TextInput
                    style={styles.input}
                    placeholder='peso'
                    onChangeText={(value)=>handleChangeText(value, 'peso')}
                    value={state.peso}
                />
                <TextInput
                    style={styles.input}
                    placeholder='altura'
                    onChangeText={(value)=>handleChangeText(value, 'altura')}
                    value={state.altura}
                />
                <TouchableOpacity style={styles.button} onPress={saveUsuario}>
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


