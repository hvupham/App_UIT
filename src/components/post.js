import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const PostForm = () => {
  const [caption, setcaption] = useState('');
  const [image, setimage] = useState('');

  const handleSubmit = () => {
    if (caption.trim() === '' || image.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ tiêu đề và nội dung');
      return;
    }

    // Tại đây, bạn sẽ gửi dữ liệu đến API hoặc lưu trữ local
    console.log('Đăng bài:', { caption, image });
    Alert.alert('Thành công', 'Bài viết đã được đăng');

    // Reset form
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
      <TextInput
        style={[styles.input, styles.imageInput]}
        placeholder="Nội dung"
        value={image}
        onChangeText={setimage}
        multiline
      />
      <Button caption="Đăng bài" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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