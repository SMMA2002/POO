import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, Button } from 'react-native';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';
import { auth } from '../credenciales'; // Importar auth desde credenciales
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const db = getFirestore();

export default function Medicos(props) {
    const navigateToAgregarMedico = () => {
        props.navigation.navigate('AgregarMedico');
    };

    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchUserData = async () => {
        try {
            const userId = auth.currentUser.uid;
            const medicosRef = collection(db, 'medicos');
            const q = query(medicosRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const medicosData = [];
                querySnapshot.forEach((doc) => {
                    medicosData.push(doc.data());
                });
                setMedicos(medicosData);
            } else {
                setMedicos([]); // Reiniciar la lista de médicos si no hay datos
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al cargar los datos de médicos. Por favor, inténtalo de nuevo más tarde.');
            console.error('Error al recuperar los datos de médicos:', error);
        } finally {
            setLoading(false);
        }
    };

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

    if (!loading && medicos.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userDataContainer}>
                    <Text>No se encontraron datos de médicos</Text>
                    <Text> </Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Agregar Médico" onPress={navigateToAgregarMedico} />
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
                    <Button title="Agregar Médico" onPress={navigateToAgregarMedico} />
                </View>
                <Text> </Text>
                <Text style={styles.text}>Lista de Médicos:</Text>
                <Text> </Text>
                {medicos.map((medico, index) => (
                    <View key={index}>
                        <Text>Nombre: {medico.nombre}</Text>
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
        backgroundColor: '#4D8BFA',
    },
    text: {
        fontWeight: 'bold', // Texto en negrita
      },
});
