import React, {useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostForm from '../components/addPost';
import Header from '../components/header';
const InstagramHome = () => {
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
  return (
    <View style={styles.container}>
      <Header />

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
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
              style={styles.postAvatar}
            />
            <Text style={styles.postUsername}>username</Text>
          </View>
          <Image
            source={{ uri: 'https://picsum.photos/500/500' }}
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
          <Text style={styles.postLikes}>1,234 likes</Text>
          <Text style={styles.postCaption}>
            <Text style={styles.postUsername}>username </Text>
            This is a sample caption for the Instagram post.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

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

export default InstagramHome;