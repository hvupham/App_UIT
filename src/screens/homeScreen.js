import React, {useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import Header from '../components/header';
import Post from '../components/post';
import BottomTabNavigator from '../components/bottomTab';
const HomeScreen = () => {
  const [isPostFormVisible, setIsPostFormVisible] = useState(false);

  const togglePostForm = () => {
    setIsPostFormVisible(!isPostFormVisible);
  };
  const handleAddPost = () => {
    togglePostForm();
  };
  const handleHeartPress = () => {
    // Xử lý sự kiện khi bấm vào biểu tượng trái tim
    console.log('Heart icon pressed');
  };
  const handlePaperPlanePress = () => {
    // Xử lý sự kiện khi bấm vào biểu tượng máy bay giấy
    console.log('Paper plane icon pressed');
  };
  return (
    <View style={styles.container}>
      <Header />
      <Post/>
      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  
});

export default HomeScreen;