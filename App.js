import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import HomeScreen from './src/screens/homeScreen';
import LoginScreen from './src/screens/loginScreen';
import ImagePicker from './src/Middleware/test';
import { createStackNavigator } from '@react-navigation/stack';
import {NEXT_PUBLIC_BASE_URL} from '@env';

console.log(NEXT_PUBLIC_BASE_URL)
const Stack = createStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="test" component={ImagePicker} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

