import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NEXT_PUBLIC_BASE_URL} from '@env';
import Story from './story';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  // lấy dữ liệu user từ AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          const userJson = JSON.parse(user);
          setUser(userJson._id);
          console.log(userJson);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/post/getAll`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };
    fetchPosts();
  }, 
  []);
  const handleLike = async(postId)=>{
    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/post/like`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user,postId})
      });
      const data = await response.json();
      console.log(data)
      // console.log({user,postId})
      // setPosts((prevPosts) =>
      // Cập nhật số lượng like và trạng thái đã like
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(user)
                  ? post.likes.filter((like) => like !== user) // Bỏ "like" nếu đã "like" trước đó
                  : [...post.likes, user], // Thêm "like" nếu chưa "like"
              }
            : post
        )
      );

    } catch (err){
      console.log({message: err})
    }
    

  }
    console.log(posts, "Dữ liệu bài viết");
    return (
        <ScrollView>
        <Story/>
        {/* Post */}
        <ScrollView>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.userAvatar || 'https://randomuser.me/api/portraits/women/1.jpg' }}
                style={styles.postAvatar}
              />
              <Text style={styles.postUsername}>{post.user.username || 'username'}</Text>
            </View>
            <Image
              source={{ uri: post.image || 'https://picsum.photos/500/500' }}
              style={styles.postImage}
            />
            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleLike(post._id)}>
                <Ionicons 
                  name={post.likes.includes(user) ? "heart" : "heart-outline"}
                  size={24}
                  color={post.likes.includes(user) ? "red" : "black"}
                 />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="paper-plane-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.postLikes}>{post.likes?.length??  '100'} likes</Text>
            <Text style={styles.postCaption}>
              <Text style={styles.postUsername}>{post.user.username || 'username'} </Text>
              {post.caption || 'This is a sample caption for the Instagram post.'}
            </Text>
          </View>
        ))}
        </ScrollView>
        
      </ScrollView>
    );
};
const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      post: {
        marginBottom: 15,
      },
      postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },
      postAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
      },
      postUsername: {
        fontWeight: 'bold',
      },
      postImage: {
        width: '100%',
        height: 400,
      },
      postActions: {
        flexDirection: 'row',
        padding: 10,
      },
      postLikes: {
        fontWeight: 'bold',
        paddingHorizontal: 10,
      },
      postCaption: {
        paddingHorizontal: 10,
        paddingBottom: 10,
      },
});
export default Post;