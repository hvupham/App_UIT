import React, {useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostForm from './addPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = ()=>{
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
    const handleLogout = async() => {
        try {
            // Xóa thông tin người dùng khỏi AsyncStorage
            await AsyncStorage.removeItem('user');
            console.log('User logged out successfully');
            
            // Điều hướng về trang đăng nhập
            navigation.navigate('Login');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    return (
        <View style={styles.header}>
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={handleAddPost}>
                    <Ionicons name="add-circle-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHeartPress}>
                    <Ionicons name="heart-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePaperPlanePress}>
                    <Ionicons name="paper-plane-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>

            <Modal
                visible={isPostFormVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={togglePostForm}
            >
                <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={togglePostForm}>
                    <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <PostForm onClose={togglePostForm} />
                </View>
                </View>
            </Modal>
        </View>
        
        
    );

};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 44,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
      },
    headerIcons: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
    },
    closeButton:{
        marginBottom: 50,
        marginLeft: 50,
        padding:10
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
    },
})
export default Header;