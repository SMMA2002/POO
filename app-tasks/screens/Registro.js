import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

export default function Registro(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registro = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registro exitoso', 'Bienvenido/a!');
            props.navigation.navigate('Cuenta');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Hubo un error al registrar. Por favor, inténtalo de nuevo.');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='correo@gmail.com'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={registro}>
                    <Text style={styles.buttonText}>Registrarse</Text>
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
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
