import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NEXT_PUBLIC_BASE_URL} from '@env';
import HomeScreen from './src/screens/homeScreen';
import LoginScreen from './src/screens/loginScreen';
import AppLoading from './src/screens/appLoading';
import ProfileScreen from './src/screens/profileScreen';

console.log(NEXT_PUBLIC_BASE_URL)
console.log(process.env.NEXT_PUBLIC_BASE_URL)

const Stack = createStackNavigator();

// initialRouteName="Login"

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator > 
        <Stack.Screen name="Aploading" component={AppLoading} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

