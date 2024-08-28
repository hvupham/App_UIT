import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AppLoading = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                const currentRoute = await AsyncStorage.getItem('currentRoute');

                if (user) {
                    // Nếu có thông tin người dùng, điều hướng đến trang hiện tại
                    navigation.navigate(currentRoute || 'Home');
                } else {
                    // Nếu không có thông tin người dùng, điều hướng đến trang đăng nhập
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, [navigation]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return null; // Trả về null khi không còn tải
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppLoading;
