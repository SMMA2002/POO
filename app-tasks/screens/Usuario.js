import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator,Button } from 'react-native';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';
import { auth } from '../credenciales'; // Importar auth desde credenciales
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const db = getFirestore();

export default function Historial(props) {
  const editCuenta = () => {
    props.navigation.navigate('EditarCuenta');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Editar Cuenta" onPress={editCuenta} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#4D8BFA',
  },
});
