import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, Button } from 'react-native';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';
import { auth } from '../credenciales'; // Importar auth desde credenciales
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const db = getFirestore();

export default function Enfermedades(props) {
    const navigateToAgregarEnfermedades = () => {
        props.navigation.navigate('AgregarEnfermedad');
    };

    const [enfermedades, setEnfermedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchUserData = async () => {
        try {
            const userId = auth.currentUser.uid;
            const citiesRef = collection(db, 'enfermedades');
            const q = query(citiesRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const enfermedadesData = [];
                querySnapshot.forEach((doc) => {
                    enfermedadesData.push(doc.data());
                });
                setEnfermedades(enfermedadesData);
            } else {
                setEnfermedades([]); // Reiniciar la lista de enfermedades si no hay datos
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al cargar los datos del usuario. Por favor, inténtalo de nuevo más tarde.');
            console.error('Error al recuperar los datos del usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigation.navigate('Login');
            } else {
                fetchUserData();
            }
        };

        checkAuth();
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });

        return unsubscribe;
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando datos...</Text>
            </View>
        );
    }

    if (!loading && enfermedades.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userDataContainer}>
                    <Text>No se encontraron datos de enfermedades</Text>
                    <Text> </Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Agregar Enfermedad" onPress={navigateToAgregarEnfermedades} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userDataContainer}>
               
                <Text> </Text>
                <View style={styles.buttonContainer}>
                    <Button title="Agregar Enfermedad" onPress={navigateToAgregarEnfermedades} />
                </View>
                <Text> </Text>
                <Text style={styles.text}>Lista de Enfermedades:</Text>
                <Text> </Text>
                {enfermedades.map((enfermedad, index) => (
                    <View key={index}>
                        <Text>Nombre: {enfermedad.nombre}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor:'#4D8BFA',
    },
    text: {
        fontWeight: 'bold', // Texto en negrita
      },
});

