import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator, Button, Dimensions, Image } from 'react-native';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { auth } from '../credenciales';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Importa el ícono de MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const screenWidth = Dimensions.get('window').width;

const db = getFirestore();

export default function Home(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [noteText, setNoteText] = useState('');

    const [recordatorios, setRecordatorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const editar = () => {
        // Abre el modal al presionar el botón de editar
        setModalVisible(true);
    }

    const eliminarNota = async (id) => {
        try {
            // Referencia al documento que se va a eliminar
            const notaRef = doc(db, 'recordatorios', id);
    
            // Eliminar el documento de la base de datos
            await deleteDoc(notaRef);
    
            // Actualizar la lista de recordatorios
            await fetchUserData();
    
            Alert.alert('Nota eliminada con éxito');
    
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un error al eliminar la nota.');
        }
    }

    const guardarRecordatorio = async () => {
        try {
            if (!auth.currentUser) {
                Alert.alert('Error', 'No se pudo encontrar el usuario autenticado.');
                return;
            }

            await addDoc(collection(db, 'recordatorios'), {
                userId: auth.currentUser.uid,
                nota: noteText,
                fechaCreacion: new Date(),
            });

            // Limpiar el campo de texto
            setNoteText('');

            // Actualizar la lista de recordatorios
            await fetchUserData();

            Alert.alert('Guardado con éxito');
            setModalVisible(false);

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un error al guardar.');
        }
    }


    const fetchUserData = async () => {
        try {
            const userId = auth.currentUser.uid;
            const recordatoriosRef = collection(db, 'recordatorios');
            const q = query(recordatoriosRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const recordatoriosData = [];
                querySnapshot.forEach((doc) => {
                    recordatoriosData.push({ id: doc.id, ...doc.data() }); // Incluir el ID del documento
                });

                // Ordenar los recordatorios por fecha de creación
                recordatoriosData.sort((a, b) => a.fechaCreacion - b.fechaCreacion);

                setRecordatorios(recordatoriosData);
            } else {
                setRecordatorios([]); // Reiniciar la lista si no hay datos
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al cargar. Por favor, inténtalo de nuevo más tarde.');
            console.error('Error al recuperar los recordatorios:', error);
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

    if (!loading && recordatorios.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.text}>Bienvenid@</Text>
                </View>
                <View>
                <Image source={require('../imagen/MediPro1.png')} style={styles.logo} />
                </View>
                <View style={styles.recordatoriosContainer}>
                    <Text>Sin recordatorios</Text>
                </View>
                {/* Botón flotante de edición */}
                <TouchableOpacity style={styles.floatingButtonRight} onPress={editar}>
                    <MaterialCommunityIcons name="plus" size={30} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>Bienvenid@</Text>
            </View>
            <View>
            <Image source={require('../imagen/MediPro1.png')} style={styles.logo} />
            </View>
            <Text> </Text>
            <Text> </Text>

            <View style={styles.recordatoriosContainer}>
            {recordatorios.map((recordatorio, index) => (
                <TouchableOpacity style={styles.noteContainer} key={index} onPress={() => eliminarNota(recordatorio.id)}>
                    <Text> </Text>
                    <MaterialCommunityIcons name="bell" size={30} color="#BCD7FC" style={styles.editIcon} />
                    <Text style={styles.noteText}>{recordatorio.nota}</Text>
                </TouchableOpacity>
            ))}
            </View>
            {/* Botón flotante de edición */}
            <TouchableOpacity style={styles.floatingButton} onPress={editar}>
                <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>

            {/* Modal para agregar nota */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Escribe tu recordatorio aquí"
                            value={noteText}
                            onChangeText={setNoteText}
                            multiline={true}
                        />
                        <TouchableOpacity style={styles.button} onPress={guardarRecordatorio}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
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
    recordatoriosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    noteContainer: {
        backgroundColor: '#F6F6F9',
        width: screenWidth / 3 - 15, // Ancho de cada tarjeta (con margen)
        height: screenWidth / 3 - 15, // Alto de cada tarjeta (con margen)
        marginBottom: 20, // Margen inferior entre las tarjetas
        marginRight: 5, // Margen lateral entre las tarjetas
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteText: {
        marginLeft: 5,
    },
    editIcon: {
        position: 'absolute',
        top: 5,
        left: 5,
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
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4D8BFA',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    floatingButtonRight: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4D8BFA',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20, // Tamaño de fuente aumentado
        fontWeight: 'bold', // Texto en negrita
      },
});


