import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, Button } from 'react-native';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';
import { auth } from '../credenciales'; // Importar auth desde credenciales
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const db = getFirestore();

export default function Alergias(props) {
    const navigateToAgregarAlergias = () => {
        props.navigation.navigate('AgregarAlergias');
    };

    const [alergias, setAlergias] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchUserData = async () => {
        try {
            const userId = auth.currentUser.uid;
            const alergiasRef = collection(db, 'alergias');
            const q = query(alergiasRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const alergiasData = [];
                querySnapshot.forEach((doc) => {
                    alergiasData.push(doc.data());
                });
                setAlergias(alergiasData);
            } else {
                setAlergias([]); // Reiniciar la lista de alergias si no hay datos
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al cargar los datos de alergias. Por favor, inténtalo de nuevo más tarde.');
            console.error('Error al recuperar los datos de alergias:', error);
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

    if (!loading && alergias.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userDataContainer}>
                    <Text>No se encontraron datos de alergias</Text>
                    <Text> </Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Agregar Alergias" onPress={navigateToAgregarAlergias} />
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
                    <Button title="Agregar Alergias" onPress={navigateToAgregarAlergias} />
                </View>
                <Text> </Text>
                <Text style={styles.text}>Lista de Alergias:</Text>
                <Text> </Text>
                {alergias.map((alergia, index) => (
                    <View key={index}>
                        <Text>Nombre: {alergia.nombre}</Text>
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
