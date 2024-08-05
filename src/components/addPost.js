import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import UploadImage from '../Middleware/uploadImage';
const PostForm = () => {
  const [caption, setcaption] = useState('');
  const [image, setimage] = useState('');
  const handleImagePicked = async (uri) => {
    setimage(uri);
  };
  const handleSubmit = () => {
    if (caption.trim() === '' || image.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ tiêu đề và nội dung');
      return;
    }
    console.log('Đăng bài:', { caption, image });
    Alert.alert('Thành công', 'Bài viết đã được đăng');
    setcaption('');
    setimage('');
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