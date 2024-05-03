import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../credenciales'; // Importar auth desde credenciales
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const db = getFirestore();

export default function EditarCuenta() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [fieldValue, setFieldValue] = useState('');
    const [fieldToEdit, setFieldToEdit] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuth = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigation.navigate('Login');
            } else {
                fetchUserData();
            }
        };

        const fetchUserData = async () => {
            try {
                const userId = auth.currentUser.uid;
                const usuariosRef = collection(db, 'usuarios');
                const q = query(usuariosRef, where('userId', '==', userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setUserData(doc.data());
                    });
                } else {
                    Alert.alert('Usuario no encontrado', 'No se encontraron datos para este usuario.');
                }
            } catch (error) {
                Alert.alert('Error', 'Hubo un error al cargar los datos del usuario. Por favor, inténtalo de nuevo más tarde.');
                console.error('Error al recuperar los datos del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigation]);

    const handleEdit = (field) => {
        setFieldToEdit(field);
        setFieldValue(userData[field]);
        setModalVisible(true);
    };

    const saveField = async () => {
        try {
            const userId = auth.currentUser.uid;
            const usuariosRef = collection(db, 'usuarios');
            const userQuery = query(usuariosRef, where('userId', '==', userId));
            const userSnapshot = await getDocs(userQuery);
    
            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                const userRef = doc(db, 'usuarios', userDoc.id);
                await updateDoc(userRef, {
                    [fieldToEdit]: fieldValue
                });
                setModalVisible(false);
                setUserData(prevUserData => ({
                    ...prevUserData,
                    [fieldToEdit]: fieldValue
                }));
            } else {
                Alert.alert('Usuario no encontrado', 'No se encontraron datos para este usuario.');
            }
        } catch (error) {
            console.error('Error al actualizar el campo:', error);
            Alert.alert('Error', 'Hubo un error al actualizar el campo. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando datos...</Text>
            </View>
        );
    }

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No se encontraron datos de usuario</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userDataContainer}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Nombre:</Text>
                    <Text style={styles.fieldValue}>{userData.nombre}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('nombre')}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <Text> </Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Fecha de nacimiento:</Text>
                    <Text style={styles.fieldValue}>{userData.fecha}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('fecha')}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <Text> </Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Genero:</Text>
                    <Text style={styles.fieldValue}>{userData.genero}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('genero')}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <Text> </Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Email:</Text>
                    <Text style={styles.fieldValue}>{userData.email}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('email')}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <Text> </Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Telefono:</Text>
                    <Text style={styles.fieldValue}>{userData.telefono}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('telefono')}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <Text> </Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Peso:</Text>
                    <Text style={styles.fieldValue}>{userData.peso}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('peso')}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <Text> </Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Altura:</Text>
                    <Text style={styles.fieldValue}>{userData.altura}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('altura')}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar {fieldToEdit}</Text>
                        <TextInput
                            style={styles.input}
                            value={fieldValue}
                            onChangeText={setFieldValue}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Guardar" onPress={saveField} />
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

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
    userDataContainer: {
        width: '80%',
    },
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    fieldLabel: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    fieldValue: {
        flex: 1,
    },
    editButton: {
        backgroundColor: '#4D8BFA',
        padding: 5,
        borderRadius: 5,
    },
    editButtonText: {
        color: '#FFFFFF'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        
    },
});



