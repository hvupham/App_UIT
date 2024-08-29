import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Modal } from 'react-native';
import Header from '../components/header';
import BottomTabNavigator from '../components/bottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfile from '../components/editProfile';
const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { height: screenHeight } = Dimensions.get('window');
    const slideAnim = useState(new Animated.Value(screenHeight))[0];
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
              const userJson = JSON.parse(user);
              setUser(userJson);
              console.log(userJson.username);
            }
          } catch (error) {
            console.error('Lỗi khi lấy dữ liệu người dùng:', error);
          }
        };
    
        fetchUser();
      }, []);
      const handleOpenEdit = () => {
        setIsEditing(true);
        Animated.timing(slideAnim, {
          toValue: 0,  // Slide to the top (visible)
          duration: 300, // Slide speed
          useNativeDriver: true,
        }).start();
      };
      const handleCloseEdit = () => {
        Animated.timing(slideAnim, {
          toValue: screenHeight,  // Slide down (hide)
          duration: 300,
          useNativeDriver: true,
        }).start(() => setIsEditing(false));
      };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: user?.avatar ?? 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-19.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.username}>{user?.name || "user "}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user?.posts?.length ?? 100}</Text>
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
        
        <TouchableOpacity style={styles.editButton} onPress={handleOpenEdit}>
          <Text style={styles.editButtonText}>Chỉnh sửa trang cá nhân</Text>
        </TouchableOpacity>
        
        <View style={styles.gallery}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.galleryImage} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.galleryImage} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.galleryImage} />
          </View>
        </View>

        {isEditing && (
          <Modal
            transparent={true}
            animationType="none"
            visible={isEditing}
            onRequestClose={handleCloseEdit}
          >
            <Animated.View style={[styles.editModal, { transform: [{ translateY: slideAnim }] }]}>
              <EditProfile onClose={handleCloseEdit} user={user} setUser={setUser} />
            </Animated.View>
          </Modal>
        )}
      </ScrollView>
      <BottomTabNavigator />
    </View>
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