import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, Button } from 'react-native';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';
import { auth } from '../credenciales'; // Importar auth desde credenciales
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const db = getFirestore();

export default function Medicamentos(props) {
    const navigateToAgregarMedicamento = () => {
        props.navigation.navigate('AgregarMedicamento');
    };

    const [medicamentos, setMedicamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchUserData = async () => {
        try {
            const userId = auth.currentUser.uid;
            const medicamentosRef = collection(db, 'medicamentos');
            const q = query(medicamentosRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const medicamentosData = [];
                querySnapshot.forEach((doc) => {
                    medicamentosData.push(doc.data());
                });
                setMedicamentos(medicamentosData);
            } else {
                setMedicamentos([]); // Reiniciar la lista de medicamentos si no hay datos
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al cargar los datos de medicamentos. Por favor, inténtalo de nuevo más tarde.');
            console.error('Error al recuperar los datos de medicamentos:', error);
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

    if (!loading && medicamentos.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userDataContainer}>
                    <Text>No se encontraron datos de medicamentos</Text>
                    <Text> </Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Agregar Medicamento" onPress={navigateToAgregarMedicamento} />
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
                    <Button title="Agregar Medicamento" onPress={navigateToAgregarMedicamento} />
                </View>
                <Text> </Text>
                <Text style={styles.text}>Lista de Medicamentos:</Text>
                <Text> </Text>
                {medicamentos.map((medicamento, index) => (
                    <View key={index}>
                        <Text>Nombre: {medicamento.nombre}  Concentración: {medicamento.concentracion}</Text>
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
        backgroundColor: '#4D8BFA'
    },
    text: {
        fontWeight: 'bold', // Texto en negrita
      },
});
