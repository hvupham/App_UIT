import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

// Giả định rằng bạn đã có các component màn hình này
import { useNavigation } from '@react-navigation/native';
const BottomTabNavigator = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
            <Ionicons name="home-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="search-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={30} color="black" />
        </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
    bottom: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flex: 1,
      },

})


export default BottomTabNavigator;