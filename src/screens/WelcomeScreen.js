import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>APP UIT</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
      <Button style={styles.login}
        title="Login"
        // onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center',
      justifyContent: 'center',
      padding:100,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      padding: 10,
    },
    input: {
      backgroundColor: '#fff',
      padding: 20,
      width: 300,
      marginBottom: 15,
      borderRadius: 5,
    },
    login:{
      backgroundColor: '#333',
      padding: 10,
    }
  });

export default WelcomeScreen;