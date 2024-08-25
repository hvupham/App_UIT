import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NEXT_PUBLIC_BASE_URL} from '@env';

const Post = () => {
  const [posts, setPosts] = useState([]);
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
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    posts.map((post, index) =>{
      console.log("1",post.user)
    })

}, []);

    console.log(posts, "Dữ liệu bài viết");


    return (
        <ScrollView>
        {/* Stories */}
          <ScrollView horizontal style={styles.stories}>
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} style={styles.storyItem}>
                <View style={styles.storyRing}>
                  <Image
                    source={{ uri: `https://randomuser.me/api/portraits/men/${item}.jpg` }}
                    style={styles.storyImage}
                  />
                </View>
                <Text style={styles.storyText}>User {item}</Text>
              </View>
            ))}
          </ScrollView>
        

        {/* Post */}
        <ScrollView>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.userAvatar || 'https://randomuser.me/api/portraits/women/1.jpg' }}
                style={styles.postAvatar}
              />
              <Text style={styles.postUsername}>{post.username || 'username'}</Text>
            </View>
            <Image
              source={{ uri: post.image || 'https://picsum.photos/500/500' }}
              style={styles.postImage}
            />
            <View style={styles.postActions}>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="paper-plane-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.postLikes}>{post.likes.length || '1,234'} likes</Text>
            <Text style={styles.postCaption}>
              <Text style={styles.postUsername}>{post.username || 'username'} </Text>
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
    
      stories: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
      },
      storyItem: {
        alignItems: 'center',
        marginHorizontal: 8,
      },
      storyRing: {
        width: 68,
        height: 68,
        borderRadius: 34,
        borderWidth: 2,
        borderColor: '#e1306c',
        justifyContent: 'center',
        alignItems: 'center',
      },
      storyImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
      storyText: {
        fontSize: 12,
        marginTop: 4,
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