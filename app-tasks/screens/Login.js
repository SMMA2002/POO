import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logueo = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Iniciando sesión', 'Accediendo...');
            props.navigation.navigate('Menu')
        } catch (error) {
            console.log(error);
            Alert.alert('No se pudo ingresar');
        }
    }

    const registro = async () => {
        try {
            props.navigation.navigate('Registro')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
            <Image source={require('../imagen/MediPro.png')} style={styles.logo} />
            </View>
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
                <TouchableOpacity style={styles.button} onPress={logueo}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                
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
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});
