import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
