import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import UploadImage from '../Middleware/uploadImage';
import {NEXT_PUBLIC_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostForm = () => {
  const [caption, setcaption] = useState('');
  const [image, setimage] = useState('');
  const handleImagePicked = async (uri) => {
    setimage(uri);
  };
  const handleSubmit = async () => {
    if (caption.trim() === '' || image.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ tiêu đề và nội dung');
      console.log('Lỗi:', { caption, image });
      return;
    }

    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      console.log('Đăng bài:', { user: parsedUser, caption, image });

      const bodyReq = { user: parsedUser, caption, image };
      const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/post`, {
        method: 'POST',
        body: JSON.stringify(bodyReq),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Alert.alert('Thành công', 'Bài viết đã được đăng');
        console.log('Thành công:', response);
      } else {
        Alert.alert('Lỗi', 'Đăng bài thất bại');
        console.log('Lỗi:', response);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra');
      console.log('Lỗi:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        value={caption}
        onChangeText={setcaption}
      />
      <UploadImage urlUploadComplete = {handleImagePicked} />      

      <Button title="Add" onPress={handleSubmit} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'blue'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  imageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
});

export default PostForm;