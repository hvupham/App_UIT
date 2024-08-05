import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEXT_PUBLIC_BASE_URL, API } from '@env';

console.log(NEXT_PUBLIC_BASE_URL,API);
const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (!email || !password) {
      Alert.alert('Input email and password', errorMessage);
      return;
    }
    setLoading(true);
    
    try{
      console.log('Sending request with:', { email, password });
      console.log(NEXT_PUBLIC_BASE_URL)
      
      const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/login`, {
        email,
        password
      })
      console.log('Response:', response.data);
      setLoading(false);
      setEmail("");
      setPassword("");
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('token', response.data.token);
      console.log(response.data.message)
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
      Alert.alert('Login failed', errorMessage);
      console.log('Error response:', error.response?.data);
    } 
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>APP UIT</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onChangeText={setPassword}
      />
      <Button
        style={styles.login}
        title="Login"
        onPress={handleLogin}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
export default LoginScreen;