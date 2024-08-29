import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ onClose, user, setUser }) => {
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        name,
        bio,
        avatar,
      };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      onClose(); // Đóng modal sau khi lưu
    } catch (error) {
      console.error('Lỗi khi lưu thông tin người dùng:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa trang cá nhân</Text>
      
      <Text>Tên người dùng:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tên người dùng"
      />
      
      <Text>Bio:</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Giới thiệu bản thân"
        multiline
      />
      
      <Text>Avatar:</Text>
      <TextInput
        style={styles.input}
        value={avatar}
        onChangeText={setAvatar}
        placeholder="URL ảnh đại diện"
      />
      
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar || 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-19.jpg' }}
          style={styles.avatar}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    height: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontWeight: 'bold',
    width: 100,
    height:100,
    textAlign: 'center',
    marginBottom: 30,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    color: 'black',
    width: 100,
    height:60,
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfile;
