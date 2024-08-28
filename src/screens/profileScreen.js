import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import BottomTabNavigator from '../components/bottomTab';
const ProfileScreen = () => {
  return (
    // <View>
    //     <Header></Header>
    // </View>
    <ScrollView style={styles.container}>
        <BottomTabNavigator></BottomTabNavigator>
        
        <View style={styles.header}>
            <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
            />
            <View style={styles.headerInfo}>
            <Text style={styles.username}>username</Text>
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                <Text style={styles.statNumber}>100</Text>
                <Text style={styles.statLabel}>Bài viết</Text>
                </View>
                <View style={styles.statItem}>
                <Text style={styles.statNumber}>1000</Text>
                <Text style={styles.statLabel}>Người theo dõi</Text>
                </View>
                <View style={styles.statItem}>
                <Text style={styles.statNumber}>500</Text>
                <Text style={styles.statLabel}>Đang theo dõi</Text>
                </View>
            </View>
            </View>
        </View>
        
        <Text style={styles.bio}>Đây là bio của người dùng. Có thể viết nhiều dòng.</Text>
        
        <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Chỉnh sửa trang cá nhân</Text>
        </TouchableOpacity>
        
        <View style={styles.gallery}>
            {/* Thêm hình ảnh vào đây */}
            <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.galleryImage} />
            </View>
            <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.galleryImage} />
            </View>
            <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.galleryImage} />
            </View>
            {/* Thêm nhiều hình ảnh hơn nếu cần */}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  headerInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#666',
  },
  bio: {
    padding: 15,
  },
  editButton: {
    backgroundColor: '#efefef',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    margin: 15,
  },
  editButtonText: {
    fontWeight: 'bold',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  galleryImage: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default ProfileScreen;